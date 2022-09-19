import style from "./cartItem.module.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Utils
import { changeAmountBasketBook, removeBasketBook } from "../../../../utils/useLocalStorage";

//Imgs
import errorIcon from "../../../../assets/catalog/errorIcon.svg";

function CartItem(props) {
    let [amount, setAmount] = useState(props.amount);
    let price = parseFloat(props.price);
    let totalPrice = !amount ? price.toFixed(2) : (price * amount).toFixed(2);

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
    <div className={style.cartItem}>
        <div className={`${style.imgBox} ${style.imgLoading}`}>
            <Link to={`/review/${props.id}`}>
                <img src={props.img ? props.img : errorIcon} alt="imgBook" onLoad={imgLoaded}/>
            </Link>
        </div>
        <div className={style.bookData}>
            <p className={style.title}>{props.title}</p>
            <p className={style.authors}>{props.authors}</p>
            <p className={style.price}>{props.price}</p>
        </div>
        <div className={style.counterBlock}>
            <input type="number" min="1" value={amount} onChange={handleChange} onBlur={handleBlur}
                              onPaste={(event) => event.preventDefault()} onKeyDown={handleKeyDown}/>
            <span className={style.minus} onClick={amountMinus}> - </span>
            <span className={style.plus} onClick={amountPlus}> + </span>
        </div>
        <div className={style.totalSumBlock}>
            <span className={style.totalSum}>{totalPrice} {props.currency}</span>
        </div>
        <div className={style.removeItem}>
            <i className="fa-solid fa-xmark" onClick={removeItem}></i>
        </div>
    </div>
  );
}

export default CartItem;