import style from "./pageIsNotFound.module.scss";
import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";

function PageIsNotFound() {
  return (
    <div className={style.pageIsNotFound}>
        <FaSadTear />
        <p>PAGE IS NOT FOUND</p>
        <Link to="/main">
            <button className={style.backHome}>Back To Home</button>
        </Link>
    </div>
  );
}

export default PageIsNotFound;