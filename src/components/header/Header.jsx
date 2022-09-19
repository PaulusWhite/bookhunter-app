import style from "./header.module.scss";

import { useContext } from "react";
import { Link } from "react-router-dom";

//Contexts
import { Context } from "../../context/Context";

//Utils
import { getBasketData } from "../../utils/useLocalStorage";

//Components
import FastSearch from "../common/fastSearch/FastSearch";
import UserPanel from "./userPanel/UserPanel";

//Icons
import { GiHamburgerMenu } from "react-icons/gi";

//imgs
import logo from "../../assets/header/logo.svg";

function Header() {
    let { isUserAuth } = useContext(Context);
    let booksAmount = getBasketData().length; //amount of copys of the books in basket

  return (
    <header className={style.header}>
        <FastSearch />
        <div className={style.logo}>
            <img src={logo} alt="logo"/>
            <Link to="/main">
                <h1>Book 
                    <span className={style.capitalLetter}>H</span>
                    <span >unter</span>
                </h1>
            </Link>
        </div>
        <div className={`${style.profile} ${isUserAuth && style.authProfile}`}>
            {isUserAuth ? <UserPanel /> : <NonAuthPanel />}
            <span className={`${style.partition} ${isUserAuth && style.stretchedPartition}`}></span>
            <div className={style.basket} id="basket">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className={style.counter}>{booksAmount}</span>
            </div>
            <GiHamburgerMenu className={style.burgerMenu} id="burgerMenu"/>
        </div>
    </header>
  );
}

//Local Components
function NonAuthPanel() {
    return (
        <div className={style.login}>
            <span className={style.signIn} id="signIn">Login</span>
            <span className={style.partition}> / </span>
            <span className={style.registration} id="signUp">Registration</span>
        </div>
    );
}

export default Header;