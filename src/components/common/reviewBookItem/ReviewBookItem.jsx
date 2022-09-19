import style from "./reviewBookItem.module.scss";

import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

//Actions
import { getReviewBook } from "../../../context/actions";

//Contexts
import { Context } from "../../../context/Context";

//Utils
import { setBookIdForBasket, isBookInBasket, getBasketData } from "../../../utils/useLocalStorage";
import { getReviewDataBook } from "../../../utils/getBookDataForView";

//Components
import Preloader from "../../common/preloader/Preloader";

//imgs
import errorIcon from "../../../assets/catalog/errorIcon.svg";

function ReviewBookItem() {
    let params = useParams().idBook; //get current Book
    let { reviewBook, dispatch, isLoading } = useContext(Context);
    let [tab, setTab] = useState("details"); //current tab (details or description book)
    console.info(tab)
    let [bookData, description] = getReviewDataBook(reviewBook); //get processed Book data for View

    let handleChangeTab = (event) => {
      let tab = event.target.id;
      let tabsPanel = event.target.parentElement.parentElement;
      let allInputs = document.querySelectorAll(`.${tabsPanel.className} input`);

      allInputs.forEach( input => {
        let label = input.nextElementSibling;
        tab === input.id ? label.classList.add(`${style.activeLabel}`) : label.classList.remove(`${style.activeLabel}`)
      });

      setTab(tab);
    }

    let isAdded = isBookInBasket(params); //find out is whether book in basket

    let addBookInBasket = () => {
      if(isAdded) return;
      
      //put bookData into the object
      let basketDataBook = {
        ...bookData
      }

      setBookIdForBasket(basketDataBook);
      dispatch( {type: "SET_BASKET_DATA", payload:getBasketData()} );
    }

    useEffect( () => {
      dispatch( {type:"SET_LOADING"} );

      let getReviewBookById = async () => {
        let reviewBook = await getReviewBook(params);
        dispatch( {type:"SET_REVIEW_BOOK", payload: reviewBook} );
      }
      
      getReviewBookById();
    }, [dispatch, params]);

  if(isLoading) return <Preloader />;

  return (
    <div className={style.reviewBook}>
      <div className={style.book}>
        <div className={style.tab}>
            <div className={style.tabsMenu}>
              <div>
                <input type="radio" id="details" name="tabs" checked={"details" === tab} onChange={handleChangeTab}/>
                <label htmlFor="details" className={("details" === tab) ? style.activeLabel : null}>Details</label>
              </div>
              <div>
                <input type="radio" id="description" name="tabs" checked={"description" === tab} onChange={handleChangeTab}/>
                <label htmlFor="description" className={("description" === tab) ? style.activeLabel : null}>Description</label>
              </div>
            </div>
            <p className={style.title}>{bookData.title}</p>
        </div>
        <div className={style.info}>
          {tab === "details" ? <Details reviewBook={bookData}/> 
                             : <Description description={description.description} />}
        </div>
        <button className={`${style.addBtn} ${isAdded && style.added}`} onClick={addBookInBasket}>
          {isAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

//Local Component for Tabs
let Details = (props) => {
  let reviewBook = props.reviewBook;

  let imgLoaded = (event) => {
    let imgBox = event.target.parentElement;
    imgBox.classList.remove(style.imgLoading);
  }

  return (
    <>
    <div className={`${style.imgLoading} ${style.imgBox}`}>
      <img src={reviewBook.img ? reviewBook.img : errorIcon} alt="imgBook" onLoad={imgLoaded}/>
      </div>
      <div className={style.details}>
        { reviewBook.authors && <p><span>Authors:</span> <span>{reviewBook.authors}</span></p>}
        { reviewBook.publisher && <p><span>Publisher:</span> <span>{reviewBook.publisher}</span></p> }
        { reviewBook.published && <p><span>Published:</span> <span>{reviewBook.published}</span></p> }
        { reviewBook.ISBN && <p><span>ISBN:</span> <span>{reviewBook.ISBN}</span></p> }
        { reviewBook.pageCount && <p><span>PageCount:</span> <span>{reviewBook.pageCount}</span></p> }
        { reviewBook.categories && <p className={style.categories}>
          <span>Categories:</span> <span>{reviewBook.categories}</span>
        </p> }
        { reviewBook.price && <p><span>Price:</span> <span>{reviewBook.price}</span></p> }
      </div>
    </>
  );
}

//Local Component for Tabs
let Description = (props) => {
  let description = props.description;
  
  return (
    <div className={style.descriptionBlock}>
      <p className={style.tabTitle}>Description</p>
      <p className={style.description}>
        {description}
      </p>
    </div>
  );
}

export default ReviewBookItem;