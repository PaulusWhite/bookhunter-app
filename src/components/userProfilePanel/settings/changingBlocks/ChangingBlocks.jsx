import style from "./changingBlocks.module.scss";

//Components
import { FisrtName, LastName, Email, NickName, Password, RepeatPassword } from "../../../common/validationInputs/ValidationInputs";

function ChangeName() {
    return (
        <div id="changeNameBlock" className={style.changeNameBlock}>
            <FisrtName label="New First Name" />
            <LastName label="New Last Name" />
        </div>
    );
}

function ChangeNickName() {
    return (
        <div id="changeNickNameBlock" className={style.changeNickNameBlock}>
            <NickName label="New Nickname"/>
        </div>
    );
}

function ChangeEmail() {
    return (
        <div id="changeEmailBlock" className={style.changeEmailBlock}>
            <Email label="New Email"/>
            <RepeatPassword label="Enter Password To Confirm" />
            <p className={style.wrongDataMessage}></p>
        </div>
    );
}

function ChangePassword() {
    return (
        <div id="changePasswordBlock" className={style.changePasswordBlock}>
            <Password label="Current Password" />
            <Password id="newPassword" label="New Password" />
            <RepeatPassword label="Repeat New Password" />
            <p className={style.wrongDataMessage}></p>
        </div>
    );
}

function SuccessfulChange(props) {
    return (
        <>
        <p>Your data has been successfully changed</p>
        <button onClick={() => props.setSuccessfulChange(false)}>Ok</button>
        </>
    );
}

function DeleteProfile() {
    return (
        <div id="deleteProfile" className={style.deleteProfile}>
            <Password />
            <RepeatPassword />
            <p className={style.wrongDataMessage}></p>
        </div>
    );
}

export { ChangeName, 
        ChangeNickName, 
        ChangeEmail, 
        ChangePassword, 
        SuccessfulChange, 
        DeleteProfile
    }