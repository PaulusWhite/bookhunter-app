import style from "./authorization.module.scss";

import { useEffect, useState, useRef } from "react";

//icons
import { VscChromeClose } from 'react-icons/vsc';

//Plugins
import showAuthorizationBlock from "../../plugins/authorization/showAuthorizationBlock";

//Components
import Registration from "./registration/Registration";
import Login from "./login/Login";

function Authorization() {
    let authorizationBlock = useRef();
    let hideBtn = useRef();
    let [flag, setFlag] = useState(true); //true for Login, false for Registration

    useEffect( () => {
        showAuthorizationBlock(authorizationBlock.current, style.showAuthorizationBlock, hideBtn.current, setFlag);
    }, []);

  return (
    <div className={style.authorization} ref={authorizationBlock}>
        <span className={style.hideBtn} ref={hideBtn}>
            <VscChromeClose />
        </span>
        <div className={style.poster}>
            <p className={style.tagline}>Your digital bookstore</p>
            <p>Thousands books for every taste</p>
        </div>
        <div className={style.signInSignUpBlock}>
            {flag ? <Login setFlag={setFlag} /> 
                  : <Registration setFlag={setFlag} />}
        </div>
    </div>
  );
}

export default Authorization;