//Styles
import style from "./settings.module.scss";
import changingBlockStyle from "./changingBlocks/changingBlocks.module.scss";
import inputsStyle from "../../common/validationInputs/validationInputs.module.scss";

import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";

//Contexts
import { Context } from "../../../context/Context";

//Actions
import { updateUserData } from "../../../context/actions";

//Plugins
import { showErrorMessage,
        nickNameValidation,
        emailValidation,
        passwordValidation,
        repeatPasswordValidation 
    } from "../../../plugins/common/inputsValidation";

import displaySpinner from "../../../plugins/common/displaySpinner";

//Utils
import { getCurrentUserData } from "../../../utils/firebaseFunctions";

//Components
import { ChangeName, 
        ChangeNickName, 
        ChangeEmail, 
        ChangePassword, 
        SuccessfulChange, 
        DeleteProfile
    } from "./changingBlocks/ChangingBlocks";

function Settings(props) {
    let [ currentTab, setCurrentTab ] = useState("");
    let { userData, dispatch } = useContext(Context);

    //first value of initial state is flag for SuccessfulChange component,
    //second value if flag for ProfileDeletedMessage component↓
    let [ isSuccessfulChange, setSuccessfulChange ] = useState([false, null]);

    useEffect( () => {
        let allTabs = document.querySelectorAll(`.${style.changingData} p`);
        allTabs.forEach( tab => {
            currentTab === tab.id ? tab.classList.add(style.active) : tab.classList.remove(style.active);
        });
    }, [currentTab]);

    let setTab = (value) => {
        setCurrentTab(value);
        setSuccessfulChange(false); //reset by default the message about successful change
    }

    //functions for changing data validation ↓

    let nameDataValidation = (changingBlockInputs) => {
        let changingData = [];
        changingBlockInputs.forEach( input => {
            changingData.push( {field: input.id, value: input.value} );
        });
        return [ true, changingData ];
    }

    let nickNameDataValidation = (input) => {
        let changingData = [];
        let flag = nickNameValidation(input, inputsStyle.showWrongNickNameMessage);
        flag === 1 && (changingData = [ {field: input.id, value: input.value} ]);
        return changingData.length ? [ true, changingData ] : [false];
    }

    let emailDataValidation = (changingBlockInputs) => {
        let newEmailInput = changingBlockInputs[0];
        let passwordInput = changingBlockInputs[1];
        let changingData = [];
        let flag = emailValidation(newEmailInput, inputsStyle.showWrongEmailMessage);
        changingData = flag && [ {field: newEmailInput.id, value: newEmailInput.value, currentPassword:passwordInput.value} ];

        return changingData.length ? [ true, changingData, "auth" ] : [false];
    }

    let passwordDataValidation = (changingBlockInputs) => {
        let currentPasswordInput = changingBlockInputs[0];
        let newPasswordInput = changingBlockInputs[1];
        let repeatNewPasswordInput = changingBlockInputs[2];
        let changingData = [];
        let flag1 = passwordValidation(newPasswordInput, inputsStyle.showWrongPasswordMessage);
        let flag2 = repeatPasswordValidation( repeatNewPasswordInput, newPasswordInput, inputsStyle.showWrongRepeatPassword);
        changingData = (flag1 && flag2) && [ {field: "newPassword", value: newPasswordInput.value, currentPassword: currentPasswordInput.value} ];
        
        return changingData.length ? [ true, changingData, "auth" ] : [false];
    }

    let deleteProfileValidation = (changingBlockInputs) => {
        let passwordInput = changingBlockInputs[0];
        let repeatPasswordInput = changingBlockInputs[1];
        let changingData = [];
        let flag = repeatPasswordValidation( repeatPasswordInput, passwordInput, inputsStyle.showWrongRepeatPassword);
        changingData = flag && [ {field: "deleteProfile", currentPassword: passwordInput.value} ];
        return changingData.length ? [ true, changingData, "auth" ] : [false];
    }

    //Common function for ChangheEmailBlock, ChangePasswordBlock, DeleteProfileBlock from ./ChangingBlocks.jsx
    let showLocalErrorMessage = (changingBlock, errorMessage) => {
        let errorMessageField = document.querySelector(`#${changingBlock.id} .${changingBlockStyle.wrongDataMessage}`);
        let errorText = "Some error has happened witch yor conntection. Please try again a little later";
        if(errorMessage === "auth/too-many-requests"){
            errorText = "You have done too many failed attempts to enter correct password. Please, try again in a few minutes";
        }
        if(errorMessage === "auth/wrong-password"){
            errorText = "You have entered incorrect password";
        }
        errorMessageField.textContent = errorText;
        errorMessageField.classList.add(changingBlockStyle.showWrongDataMessage);
    }

    let handleDataValidation = (changingBlock, changingBlockInputs) => {
        let [ permition, changingData, dataType ] = [null, [], "database"]; //database is value by default
        if(changingBlock.id === "changeNameBlock") [ permition, changingData ] = nameDataValidation(changingBlockInputs);
        if(changingBlock.id === "changeNickNameBlock") [ permition, changingData ] = nickNameDataValidation(changingBlockInputs[0]);
        if(changingBlock.id === "changeEmailBlock") [ permition, changingData, dataType ] = emailDataValidation(changingBlockInputs);
        if(changingBlock.id === "changePasswordBlock") [ permition, changingData, dataType ] = passwordDataValidation(changingBlockInputs);
        if(changingBlock.id === "deleteProfile") [ permition, changingData, dataType ] = deleteProfileValidation(changingBlockInputs); 

        return [ permition, changingData, dataType ]
    }

    //quite large function
    let handleForm = async (event) => {
        event.preventDefault();
        let changingBlock = event.target.firstElementChild;
        let changingBlockInputs = document.querySelectorAll(`#${changingBlock.id} input`);
        let isInputsEmpty = false;

        changingBlockInputs.forEach( input => {
            if(!input.value){
                showErrorMessage(input, inputsStyle.showEmptyMessage);
                isInputsEmpty = true;
            }
        });

        if(isInputsEmpty) return;

        let [ permition, changingData, dataType ] = handleDataValidation(changingBlock, changingBlockInputs);

        if(!permition) return;

        displaySpinner(true);

        let response = await updateUserData(userData.personalID, changingData, dataType);
        if(!response[0]){
            displaySpinner(false)
            return showLocalErrorMessage(changingBlock, response[1])
        };

        response[0] && onAuthStateChanged(auth, async (user) => {
            if (user) {
                let currentUserData = await getCurrentUserData(auth);
                dispatch( {type: "SET_CURRENT_USER", payload: currentUserData} );
            }
        });

        if(response[1]){
            return props.setProfileDeleted(true)
        }

        displaySpinner(false);
        setSuccessfulChange([true]);
        setCurrentTab("");
    }

  return (
    <div className={style.settingsTab}>
        <div className={style.changingData}>
            <p id="name" onClick={(event) => setTab(event.target.id)}>Change Name</p>
            <p id="nickName" onClick={(event) => setTab(event.target.id)}>Change Nickname</p>
            <p id="email" onClick={(event) => setTab(event.target.id)}>Change Email</p>
            <p id="password" onClick={(event) => setTab(event.target.id)}>Change Password</p>
            <p id="deleteProfile" onClick={(event) => setTab(event.target.id)} >Delete Profile</p>
        </div>
        <div className={style.newData}>
            <form id="changeForm" onSubmit={handleForm}>
                {(!currentTab && !isSuccessfulChange[0]) && <p className={style.clue}>Choose data you want to change</p>}
                {isSuccessfulChange[0] && <SuccessfulChange setSuccessfulChange={setSuccessfulChange}/>}
                {currentTab === "name" && <ChangeName />}
                {currentTab === "nickName" && <ChangeNickName />}
                {currentTab === "email" && <ChangeEmail />}
                {currentTab === "password" && <ChangePassword />}
                {currentTab === "deleteProfile" && <DeleteProfile />}
                {currentTab && <button type="submit">
                    {currentTab === "deleteProfile" ? "Delete Profile" : "Change"}
                </button>}
            </form>
        </div>
    </div>
  );
}

export default Settings;