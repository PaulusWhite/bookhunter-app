import style from "./registration.module.scss";
import inputsStyle from "../../common/validationInputs/validationInputs.module.scss";

import { useRef } from "react";

//Actions
import { userRegistration } from "../../../context/actions";

//Plugins
import { nickNameValidation, 
        passwordValidation, 
        repeatPasswordValidation, 
        emailValidation, 
        showErrorMessage 
    } from "../../../plugins/common/inputsValidation";    
import displaySpinner from "../../../plugins/common/displaySpinner";

//Components
import { FisrtName, 
        LastName, 
        Email, 
        NickName, 
        Password, 
        RepeatPassword 
    } from "../../common/validationInputs/ValidationInputs";

function Registration(props) {
    let wrongDataMessage = useRef();

    let showWrongDataMessage = (errorCode) => {
        let errorText;
        if(errorCode === "auth/email-already-in-use"){
            errorText = "Specified email is already used by another user"
        }else{
            errorText = "Some error has happened. Please try again a little later";
        }

        wrongDataMessage.current.textContent = errorText;
        wrongDataMessage.current.classList.add(style.showWrongDataMessage);     
    }

    let getPermissionForRegistration = (allInputs) => {
        let counter = 0;
        allInputs.forEach( (input, index) => {
            if(input.value === ""){
                return showErrorMessage(input, inputsStyle.showEmptyMessage);
            }
            if(input.id === "email"){
                return counter += emailValidation(input, inputsStyle.showWrongEmailMessage);
            }
            if(input.id === "nickName"){
                return counter += nickNameValidation(input, inputsStyle.showWrongNickNameMessage);
            }
            if(input.id === "password"){
                return counter += passwordValidation(input, inputsStyle.showWrongPasswordMessage);
            }
            if(input.id === "passwordRepeat"){
                return counter += repeatPasswordValidation(input, allInputs[index-1], inputsStyle.showWrongRepeatPassword);
            }

            return counter += 1; //for firstName and lastName inputs
        });

        return counter === 6 ? true : false; //permission for further registration
    }
    
    let handleForm = async (event) => {
        event.preventDefault();
        let allInputs = document.querySelectorAll(`#registrationForm input`);
        let permission = getPermissionForRegistration(allInputs);
        if(permission){
            displaySpinner(true);

            let newUserData = {};

            allInputs.forEach( input => {
                if(input.id === "passwordRepeat") return;
                newUserData[input.id] = input.value;
            });

            let [isSuccess, errorCode] = await userRegistration(newUserData);

            displaySpinner(false);

            !isSuccess ? showWrongDataMessage(errorCode) : document.body.removeAttribute("style");
        }
    }

    return (
        <div className={style.registrationBlock}>
            <p className={style.heading}>Registration</p>
            <p className={style.offerBtn}>
                Already have an account? <span id="login" onClick={() => props.setFlag(true)}>Login</span>
            </p>
            <p className={style.wrongDataMessage} ref={wrongDataMessage}></p>
            <form id="registrationForm" onSubmit={handleForm}>
                <div className={style.row}>
                    <FisrtName />
                    <LastName />
                </div>
                <div className={style.row}>
                    <Email />
                    <NickName />
                </div>
                <div className={style.row}>
                    <Password />
                    <RepeatPassword />
                </div>
                <button type="submit">Registration</button>
            </form>
        </div>
    );
}

export default Registration;