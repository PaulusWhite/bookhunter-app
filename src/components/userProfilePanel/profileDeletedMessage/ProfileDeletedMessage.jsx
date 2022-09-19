import style from "./profileDeletedMessage.module.scss";

import { useContext } from "react";

//Plugins
import displayUserProfile from "../../../plugins/header/userPanel/displayUserProfile";

//Contexts
import { Context } from "../../../context/Context";

function ProfileDeletedMessage() {
    let { dispatch } = useContext(Context);

    let closeMessage = () => {
        displayUserProfile().hideUserProfile();
        dispatch( {type: "SET_UNAUTHORIZED_USER"} );
    }
    return (
        <div className={style.profileDeletedMessage}>
            <p>Your profile has been successfully deleted</p>
            <button onClick={closeMessage}>Ok</button>
        </div>
    );
}

export default ProfileDeletedMessage;