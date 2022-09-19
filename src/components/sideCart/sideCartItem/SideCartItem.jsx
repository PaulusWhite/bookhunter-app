import style from "./sideCartItem.module.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Utils
import { changeAmountBasketBook, removeBasketBook } from "../../../utils/useLocalStorage";

//imgs
import errorIcon from "../../../assets/catalog/errorIcon.svg";

function SideCartItem(props) {
    let [amount, setAmount] = useState(props.amount);

    let changeAmount = (newAmount) => {
        changeAmountBasketBook(props.id, newAmount);
        props.updateBasket();
    }

    let handleChange = (event) => {
        let newAmount = +event.target.value;
        (newAmount === 1) && setAmount(1);
        (newAmount <= 100 && newAmount !== 0) && changeAmount(newAmount); //input limit
        (newAmount === 0) && setAmount("");
    }

    //get back minimum value
    let handleBlur = () => {
        if(amount === ""){
            setAmount(1);
            changeAmount(1);
        };
    }

    //input prohibition of +-e
    let handleKeyDown = (event) => {
        [69, 187, 188, 189, 190].includes(event.keyCode) && event.preventDefault();
    }

    let amountMinus = () => {
        amount !== 1 && changeAmount(--amount);
    }

    let amountPlus = () => {
        amount < 100 && changeAmount(++amount);
    }

    let removeItem = () => {
        removeBasketBook(props.id);
        props.updateBasket();
    }

    let imgLoaded = (event) => {
        let imgBox = event.target.parentElement.parentElement;
        imgBox.classList.remove(style.imgLoading);
    }

    useEffect( () => {
        setAmount(props.amount);
    }, [props.amount]);

  return (
    <div className={style.sideCartItem}>
        <div className={`${style.imgBox} ${style.imgLoading}`}>
            <Link to={`/review/${props.id}`}>
                <img src={props.img ? props.img : errorIcon} alt="itemImg" onLoad={imgLoaded}/>
            </Link>
        </div>
        <div className={style.itemDescription}>
            <p className={style.title}>{props.title}</p>
            <p className={style.price}>{props.price}</p>
            <div className={style.itemCurrent}>
                <i className="fa-solid fa-minus" onClick={amountMinus}></i>
                <i className="fa-solid fa-plus" onClick={amountPlus}></i>
                <input type="number" min="1" value={amount} onChange={handleChange} onBlur={handleBlur}
                                             onPaste={(event) => event.preventDefault()} onKeyDown={handleKeyDown}/>
            </div>
        </div>
        <div className={style.removeItem}>
            <i className="fa-solid fa-square-xmark" onClick={removeItem}></i>
        </div>
    </div>
  );
}

export default SideCartItem;