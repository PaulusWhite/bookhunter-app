import style from "./userProfilePanel.module.scss";

import { useContext, useRef, useState, useEffect } from "react";

//Contexts
import { Context } from "../../context/Context";

//Actions
import { logOut } from "../../context/actions";

//Plugins
import displayUserProfile from "../../plugins/header/userPanel/displayUserProfile";
import displaySubmenu from "../../plugins/header/userPanel/displaySubmenu";

//Icons
import { BiMessageAltMinus } from "react-icons/bi";
import { FaRegWindowClose } from "react-icons/fa";

//Components
import MyProfile from "./myProfile/MyProfile";
import MyOrders from "./myOrders/MyOrders";
import Settings from "./settings/Settings";
import ProfileDeletedMessage from "./profileDeletedMessage/ProfileDeletedMessage";

//imgs
import userAlt from "../../assets/userProfilePanel/userAlt.svg";
import booksDefault from "../../assets/userProfilePanel/booksDefault.svg";

function UserProfilePanel() {
    let { userData, dispatch } = useContext(Context);
    let [currentTab, setTab] = useState(null); //current tab of user profile panel
    let [isProfileDeleted, setProfileDeleted] = useState(false);
    let nav = useRef();

    let changeWorkWindow = (event) => {
        setTab(event.target.id)
    }

    let logOutPrifile = async () => {
        await logOut();
        displayUserProfile().hideUserProfile();
        dispatch( {type: "SET_UNAUTHORIZED_USER"} );
    }
    
    let tabTitle = document.querySelector(`#${currentTab}`);

    useEffect( () => {
        let allTabs = document.querySelectorAll(`.${style.nav} span`);
        let allUserProfileLinks = document.querySelector("#userProfileLinks");

        [].forEach.call(allUserProfileLinks.children, link => {
            if(!link.dataset.miss){
              link.onclick = () => {
                displayUserProfile().showUserProfule();
                setTab(link.dataset.submenuid);
                displaySubmenu()
              };
            }
        });

        allTabs.forEach( tab => {
            currentTab === tab.id ? tab.classList.add(style.active) : tab.classList.remove(style.active);
        });
        
    }, [currentTab]);

    if(isProfileDeleted) return <ProfileDeletedMessage />

  return (
    <div className={style.userProfilePanel} id="userProfilePanel">
        <span className={style.closeBtn} onClick={() => displayUserProfile().hideUserProfile()}><FaRegWindowClose /></span>
        <p className={style.heading}>My Profile</p>
        <div className={style.profileInfo}>
            <div className={style.userPhoto}>
                <div className={style.imgBox}>
                    <img src={userAlt} alt="..." />
                </div>
                <p className={style.nickName}>{userData.nickName}</p>
            </div>
            <MyProfile {...userData} /> 
        </div>
        <div className={style.blackboard}>
            <div className={style.nav} ref={nav}>
                <span id="myOrders" onClick={changeWorkWindow}>My orders</span>
                <span id="myNotifications" onClick={changeWorkWindow}>My notifications</span>
                <span id="settings" onClick={changeWorkWindow}>Settings</span>
                <span onClick={logOutPrifile}>Log out</span>
            </div>
            <div className={style.workWindow}>
                {tabTitle ? <p className={style.tabTitle}>{tabTitle.textContent}</p> : <DefaultBackground />}
                {currentTab === "myOrders" && <MyOrders {...userData.orders}/>}
                {currentTab === "myNotifications" && <Notifications/>}
                {currentTab === "settings" && <Settings setProfileDeleted={setProfileDeleted}/>}
            </div>
        </div>
    </div>
  );
}

//local Components
function Notifications() {
    return(
        <div className={style.notification}>
            <p>You have not got any notifications</p>
            <BiMessageAltMinus />
        </div>
    );
}

function DefaultBackground () {
    return (
        <div className={style.defaultBackground}>
            <img src={booksDefault} alt="defaultimg"/>
        </div>
    )
}

export default UserProfilePanel;