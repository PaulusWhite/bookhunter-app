import style from "./login.module.scss";

import { useState, useRef } from "react";

//Actions
import { login } from "../../../context/actions";

//Plugins
import { emailValidation, 
        showErrorMessage 
    } from "../../../plugins/common/inputsValidation";
import displaySpinner from "../../../plugins/common/displaySpinner";

function Login(props){
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let wrongDataMessage = useRef();

    let showWrongDataMessage = (errorCode) => {
        let errorText = "Some error has happened. Please try again a little later"; //by Default
        if(errorCode === "auth/too-many-requests"){
            errorText = "You have done too many failed attempts to login. Please, try again in a few minutes";
        }
        if(errorCode === "auth/network-request-failed" || "auth/wrong-password"){
            errorText = "Password or email is incorrect";
        }
        if(errorCode === "auth/user-not-found"){
            errorText = "User with that email does not exist";
        }
        wrongDataMessage.current.textContent = errorText;
        wrongDataMessage.current.classList.add(style.showWrongDataMessage);
    }

    let handleForm = async (event) => {
        event.preventDefault();
        
        let allInputs = document.querySelectorAll(`#loginForm input`);
        let counter = 0;
        allInputs.forEach( input => {
            if(input.value === "") return showErrorMessage(input, style.showEmptyMessage);
            if(input.id === "email") return counter += emailValidation(input, style.showWrongEmailMessage);
            return counter += 1;
        });
        if(counter === 2){
            displaySpinner(true);

            let loginData = {};
            allInputs.forEach( input => loginData[input.id] = input.value);
            let [isPermission, errorCode] = await login(loginData);

            displaySpinner(false);

            !isPermission ? showWrongDataMessage(errorCode) : window.document.body.removeAttribute("style");
        }
    }

    return (
        <div className={style.loginBlock}>
            <p className={style.heading}>Login</p>
            <p className={style.offerBtn}>Don’t have an account?
                <span id="registration" onClick={() => props.setFlag(false)}> Create an account</span>
            </p>
            <p className={style.wrongDataMessage} ref={wrongDataMessage}></p>
            <form id="loginForm" onSubmit={handleForm}>
                <div className={style.group}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <p className={style.emptyMessage}>Enter your email</p>
                    <p className={style.wrongEmail}>Enter correct email</p>
                </div>
                <div className={style.group}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <p className={style.emptyMessage}>Enter your password</p>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;