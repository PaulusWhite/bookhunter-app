import style from "../../../components/header/userPanel/userPanel.module.scss";

let hideSubmenu = (userIcon, userIconClassToAdd, submenu, submenuClassToAdd) => {
    userIcon.classList.remove(userIconClassToAdd);
    submenu.classList.remove(submenuClassToAdd);
}

let displaySubmenu = () => {
    let userIcon = document.querySelector("#userIcon");
    let userIconClass = userIcon.classList[0];
    let submenu = document.querySelector("#userPanelSubmenu");
    let closeSubmenuBtn = document.querySelector("#closeUserPanelSubmenuBtn");

    userIcon.addEventListener("click", () => {
        userIcon.classList.add(style.activeIcon);
        submenu.classList.add(style.showSubmenu);
    });
    
    closeSubmenuBtn.addEventListener("click", () => {
        hideSubmenu(userIcon, style.activeIcon, submenu, style.showSubmenu);
    });
    
    window.addEventListener("click", (event) => {
        let target = event.target;
        if(target.closest(`.${userIconClass}`) || target.closest(`.${style.showSubmenu}`)) return;
        
        hideSubmenu(userIcon, style.activeIcon, submenu, style.showSubmenu);
    });
    
    return hideSubmenu(userIcon, style.activeIcon, submenu, style.showSubmenu);
}

export default displaySubmenu;