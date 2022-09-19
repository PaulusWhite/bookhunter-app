import style from "./validationInputs.module.scss";

import { useState } from "react";

//plugins
import { showErrorMessage } from "../../../plugins/common/inputsValidation";

//common HandleFunction for First name and Last Name
let commonHandleChangeName = (event, setName) => {
    let value = event.target.value;
    let re = /[a-zA-Z\s]+$/;
    if(re.test(" " + value)){
        value[0] === " " && (value = value.trim());
        setName(value);
    }else{
        showErrorMessage(event.target, style.showErrorMessage);
    }
}

//Inputs components
function FisrtName({label}) {
    let [firstName, setFirstname] = useState("");

    let handleChangeName = (event) => commonHandleChangeName(event, setFirstname);

    return (
        <div className={style.group}>
            <label htmlFor="firstName">{label ? label : "First Name"}</label>
            <input type="text" id="firstName" value={firstName} onChange={handleChangeName} maxLength="50" />
            <p className={style.errorMessage}>Field can contain only latin letters</p>
            <p className={style.emptyMessage}>Field must be filled</p>
        </div>
    );
}

function LastName({label}) {
    let [ lastName, setLastName ] = useState("");

    let handleChangeName = (event) => commonHandleChangeName(event, setLastName);

    return (
        <div className={style.group}>
            <label htmlFor="lastName">{label ? label : "Last Name"}</label>
            <input type="text" id="lastName" value={lastName} onChange={handleChangeName} maxLength="50"/>
            <p className={style.errorMessage}>Field can contain only latin letters</p>
            <p className={style.emptyMessage}>Field must be filled</p>
        </div>
    );
}

function Email({label}) {
    let [ email, setEmail ] = useState("");

    let handleChangeEmail = (event) => {
        let value = event.target.value;
        let re = /[a-zA-Z0-9._%+-@\s]+$/;
        if(re.test(" " + value)) setEmail(value.trim());
        else showErrorMessage(event.target, style.showErrorMessage);
    }

    return (
        <div className={style.group}>
            <label htmlFor="email">{label ? label : "Email"}</label>
            <input type="text" id="email" value={email} onChange={handleChangeEmail}  maxLength="345"/>
            <p className={style.errorMessage}>Field can contain only latin letters, numbers, symbols {". , _ % + = @"}, without the space</p>
            <p className={style.emptyMessage}>Field must be filled</p>
            <p className={style.wrongEmail}>Please, enter correct email</p>
        </div>
    );
}

function NickName({label}) {
    let [ nickName, setNickName ] = useState("");

    let handleChangeNickName = (event) => {
        let value = event.target.value;
        let re = /[a-zA-Z0-9\s_-]+$/;
        if(re.test(" " + value)) setNickName(value.trim());
        else showErrorMessage(event.target, style.showErrorMessage);
    }

    return (
        <div className={style.group}>
            <label htmlFor="nickName">{label ? label : "Nickname"}</label>
            <input type="text" id="nickName" value={nickName} onChange={handleChangeNickName} />
            <p className={style.errorMessage}>Field can contain only latin letters, numbers, symbols: {"- _"} </p>
            <p className={style.emptyMessage}>Field must be filled</p>
            <p className={style.wrongNickName}>Field must have at least 1 letter and total letters from 6 to 16</p>
        </div>
    );
}

function Password({id, label}) {
    let [ password, setSetPassword ] = useState("");

    let handleChangePassword = (event) => {
        let value = event.target.value;
        let re = /[a-zA-zа-яА-я!@#$&*^0-9\s]+$/;
        if(re.test(" " + value)) setSetPassword(value.trim());
        else showErrorMessage(event.target, style.showErrorMessage);
    }

    return (
        <div className={style.group}>
            <label htmlFor="password">{label ? label : "Password"}</label>
            <input type="password" id={id ? id : "password"} value={password} onChange={handleChangePassword} />
            <p className={style.errorMessage}>Field can contain only next symbols: {"! @ # $ & * ^"}</p>
            <p className={style.emptyMessage}>Field must be filled</p>
            <p className={style.wrongPassword}>Field must have at least 8 letters and total ones to 23</p>
        </div>
    );
}

function RepeatPassword({label}) {
    let [ repeatPassword, setRepeatPassword ] = useState("");

    return (
        <div className={style.group}>
            <label htmlFor="passwordRepeat">{label ? label : "Repeat Password"}</label>
            <input type="password" id="passwordRepeat" value={repeatPassword} 
                    onChange={(event) => setRepeatPassword(event.target.value)} maxLength="45"/>
            <p className={style.emptyMessage}>Field must be filled</p>
            <p className={style.wrongRepeatPassword}>The passwords don't match</p>
        </div>
    );
}

export { FisrtName, LastName, Email, NickName, Password, RepeatPassword }