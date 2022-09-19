import style from "./userPanel.module.scss";

import { Context } from "../../../context/Context";
import { useContext, useEffect } from "react";

//Plugins
import displaySubmenu from "../../../plugins/header/userPanel/displaySubmenu";

//Actions
import { logOut } from "../../../context/actions";

//Icons
import { FaUserAlt } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";

function UserPanel() {
    let { dispatch, userData } = useContext(Context);

    let logOutProfile = async () => {
      await logOut();
      dispatch( {type: "SET_UNAUTHORIZED_USER"} );
    }

    useEffect( () => {
      displaySubmenu();
    }, [dispatch, userData]);

  return (
    <div className={style.userPanel}>
        <span className={style.userIcon} id="userIcon">
          <FaUserAlt />
        </span>
        <div className={style.submenu} id="userPanelSubmenu">
          <span className={style.closeSubmenuBtn} id="closeUserPanelSubmenuBtn">
            <TiTimes />
          </span>
          <div className={style.userNickName}>
            <span>Signed as</span>
            <span>{userData.nickName}</span>
          </div>
          <div className={style.userProfileLinks} id = "userProfileLinks" >
            <span data-submenuid={null}>My profile</span>
            <span data-submenuid="myOrders">My orders</span>
            <span data-submenuid="myNotifications">My notifications</span>
            <span data-submenuid="settings">Settings</span>
            <span data-miss={true} onClick={logOutProfile}>Log out</span>
          </div>
        </div>
    </div>
  );
}



export default UserPanel;