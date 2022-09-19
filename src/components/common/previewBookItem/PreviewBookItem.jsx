import style from "./previewBookItem.module.scss";

import { Link } from "react-router-dom";
import React, { useContext } from "react";

//Contexts
import { Context } from "../../../context/Context";

//Utils
import { setBookIdForBasket, isBookInBasket, getBasketData } from "../../../utils/useLocalStorage";
import { getPreviewDataBook } from "../../../utils/getBookDataForView";

//imgs
import errorIcon from "../../../assets/catalog/errorIcon.svg";

function PreviewBookItem(props) {
  let bookData = getPreviewDataBook(props); //get processed Book data for View
  let { dispatch } = useContext(Context);
  let isAdded = isBookInBasket(bookData.id); //find out is book in Basket

  let addBookInBasket = () => {
    if(isAdded) return;
    
    let basketDataBook = {...bookData}
    
    setBookIdForBasket(basketDataBook);
    dispatch( {type: "SET_BASKET_DATA", payload:getBasketData()} );
  }

  let imgLoaded = (event) => {
    let imgBox = event.target.parentElement;
    imgBox.classList.remove(style.imgLoading);
  }

  return (
    <div className={style.previewBookItem}>
        <Link to={`/review/${bookData.id}`}>
          <div className={`${style.imgBox} ${style.imgLoading}`}>
            <img src={bookData.img ? bookData.img : errorIcon} alt="..." onLoad={imgLoaded}/>
            <p className={style.hoverTablet}>
                Quick View
            </p>
          </div>
          <p className={style.authors}>{bookData.authors}</p>
          <p className={style.title}>{bookData.title}</p>
          <p className={style.price}>{bookData.price}</p>
        </Link>
        <button className={`${style.addBtn} ${isAdded && style.added}`}  onClick={addBookInBasket}>
          {isAdded ? "Added" : "Add to Cart"}
        </button>
    </div>
  );
}

export default React.memo(PreviewBookItem);