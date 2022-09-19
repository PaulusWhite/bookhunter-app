import style from "./footer.module.scss";

//Components
import Nav from "../nav/Nav";

//imgs
import logoImg from "../../assets/header/logo.svg";

function Footer() {
  return (
    <footer>
        <div className={style.logo}>
            <img src={logoImg} alt="logo" />
            <p>Book
                <span>
                    <span>H</span>unter
                </span>
            </p>
        </div>
        <Nav className={style.footerNav}/>
        <div className={style.developerContacts}>
            <a href="https://github.com/PaulusWhite" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/edelweiss/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="mailto:pauledelweissontop@gmail.com" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-envelope"></i>
            </a>  
        </div>
    </footer>
  );
}

export default Footer;