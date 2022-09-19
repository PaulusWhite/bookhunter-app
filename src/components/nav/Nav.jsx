import style from "./nav.module.scss";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//Icons
import { AiOutlineCloseSquare } from "react-icons/ai";

//Plugins
import displayNav from "../../plugins/nav/displayNav";

//Components
import FastSearch from "../common/fastSearch/FastSearch";

function Nav() {
    let params = useParams().page; //get current Page

    useEffect( () => {
        displayNav();
    }, [params]);

  return (
    <nav id="nav">
        <FastSearch />
        <span className={style.closeNav} id="closeNavBtn">
            <AiOutlineCloseSquare/>
        </span>
        <Link to="/main" className={(params === "main" || params === undefined) ? style.activeLink : null}>
            <span>Main</span>
        </Link>
        <Link to="/catalog" className={params === "catalog" ? style.activeLink : null}>
            <span>Catalog</span>
        </Link>
        <Link to="/selections/all" className={params === "selections" ? style.activeLink : null}>
            <span>Selections</span>
        </Link>
        <Link to="/cart" className={params === "cart" ? style.activeLink : null}>
            <span>Cart</span>
        </Link>
        <Link to="/about" className={params === "about" ? style.activeLink : null}>
            <span>About</span>
        </Link>
    </nav>
  );
}

export default Nav;