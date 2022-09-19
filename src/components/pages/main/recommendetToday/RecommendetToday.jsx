import style from "./recommendetToday.module.scss";

import { Link } from "react-router-dom";

//imgs
import img from "../../../../assets/main/commingBook.webp";

function RecommendetToday(props) {
    let textContent = props.textContent;
    
  return (
    <div className={style.commingBook}>
        <div className={style.topic}>
            <span>Special For You</span>
            <span>Recommendation For Today</span>
        </div>
        <div className={style.presentation}>
            <div className={style.info}>
                <p>Title: <span>{textContent.title}</span></p>
                <p>Author: <span>{textContent.author}</span></p>
                <p className={style.description}>
                    {textContent.description}
                </p>
            </div>
            <div className={style.imgBox}>
                <Link to={`/review/${textContent.id}`}>
                    <img src={img} alt="book img" />
                </Link>
            </div>
        </div>
    </div>
  );
}

export default RecommendetToday;