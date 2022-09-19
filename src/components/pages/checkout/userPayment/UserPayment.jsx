import style from "./userPayment.module.scss";

import React, { useState, useContext, useRef, useMemo } from "react";
import { usePaymentInputs } from 'react-payment-inputs';
import { Link } from "react-router-dom";

//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase-config";

//Contexts
import { Context } from "../../../../context/Context";

//Utils
import { getBasketTotalPrice, clearBasketData } from "../../../../utils/useLocalStorage";
import { getCurrentUserData } from "../../../../utils/firebaseFunctions";

//Actions
import { makeUserOrder } from "../../../../context/actions";

//Plugins
import showSuccessMessage from "../../../../plugins/checkout/showSuccessMessage";

//imgs
import masterCardIcon from "../../../../assets/checkout/mastercard.svg";
import visaIcon from "../../../../assets/checkout/visa.svg";
import amexLogo from "../../../../assets/checkout/amex.svg";

function UserPayment() {
    let totalSum = getBasketTotalPrice();
    let { basketData, userData, dispatch } = useContext(Context);

    const { getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
    let [cardNumber, setCardNumber] = useState("");
    let [expiryDate, setExpiryDate] = useState("");
    let [cardCVVV, setCardCVVV] = useState("");
    let [cardHolder, setCardHolder] = useState("");

    let cuurentDate = new Date();
    let orderDate = `${cuurentDate.getDate()} ${cuurentDate.getMonth()} ${cuurentDate.getFullYear()}`;

    let successMessage = useRef();
    let form = useRef();
    let allInputs = document.querySelectorAll(`.${style.form} input`);

    let handleChangeCardNumber = (event) => {
        let value = event.target.value.split('').reverse().join('').replace(/\B(?=(\d{4})+(?!\d))/g, " ").split('').reverse().join('').trim();
        setCardNumber(value);
    }

    let handleChangeCVC = (event) => {
        let value = event.target.value;
        if(!/[0-9\s]+$/.test(" " + value)) return;
        setCardCVVV(event.target.value.trim());
    }

    let handleChangeExpiryDate = (event) => {
        setExpiryDate(event.target.value)
    }

    let handleChangeCardHolder = (event) => {
        let value = event.target.value;
        if(/[a-zA-Z ]+$/.test(" " + value)){
            value[0] === " " && (value = value.trim());
            setCardHolder(value);
        }
    }

    //Handle Submit
    let doneInput = (count, input) => {
        input.parentElement.classList.remove(style.wrongField);

        return count += 1;
    }

    let getPermissionForPayment = () => {
        let count = 0;

        allInputs.forEach( input => {
            if(input.id === "cardNumber" && input.value.length === 19){
                return count = doneInput(count, input);
            };
            if(input.id === "expiryDate" && input.value.length === 7){
                return count = doneInput(count, input);
            }
            if(input.id === "cvc" && input.value.length > 2){
                return count = doneInput(count, input);
            }
            if(input.id === "cardHolder" && input.value.length > 0){
                return count = doneInput(count, input);
            }
            input.parentElement.classList.add(style.wrongField);
        });

        return count === 4 ? true : false; //permission for futher payment
    }

    let handleSubmitForm = async (event) => {
        event.preventDefault();
        let permission = getPermissionForPayment();
        if(permission){
            //update current user data (firebase)
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    await makeUserOrder(userData, basketData, totalSum);
                    let currentUserData = await getCurrentUserData(auth);
                    dispatch( {type: "SET_CURRENT_USER", payload: currentUserData} );
                }
            });

            clearBasketData();
            dispatch( {type: "SET_BASKET_DATA", payload: []} );
            showSuccessMessage(successMessage.current);
        }
    }

    let orderId = useMemo( () => {
        return "CA" + Math.ceil(Math.random() * 123456); //random 
    }, []);

    let itemsArr = basketData.map( book => {
        return (
            <p className={style.itemInfo} key={book.id}>
                <span className={style.title}>{book.title}</span>
                <span className={style.price}>{book.price}</span>
                <span className={style.amount}>x {book.amount}</span>
            </p>
        );
    });
    
  return (
    <div className={style.authUserPayment}>
        <SuccessMessage ref={successMessage} />
        <div className={style.infoBlock}>
            <p className={style.totalSum}>
                <span>Total Sum:</span>
                <span>{totalSum}</span>
            </p>
            <div className={style.itemList}>
                {itemsArr}
            </div>
            <div className={style.orderInfo}>
                <p className={style.orderID}>
                    <span>
                    <i className="fa-solid fa-list-check"></i>
                    Order ID: </span>
                    <span>{orderId}</span>
                </p>
                <p className={style.orderDate}>
                    <span>
                    <i className="fa-regular fa-calendar-days"></i>
                        Order Date: </span>
                    <span>{orderDate}</span>
                </p>
            </div>
        </div>
        <div className={style.paymentForm}>
            <p>Payment</p>
            <form className={style.form} onSubmit={handleSubmitForm} ref={form}>
                <div className={style.cartNumber}>
                    <span>Credit / Debit Card</span>
                    <div>
                        <input {...getCardNumberProps({ onChange: handleChangeCardNumber })} value={cardNumber} 
                                                        placeholder="Card Number" maxLength="19"
                                                        onPaste={(event) => event.preventDefault()} />
                        <span>
                            <img src={masterCardIcon} alt="cartImg" />
                            <img src={visaIcon} alt="cartImg" />
                            <img src={amexLogo} alt="cartImg" />
                        </span>
                    </div>
                </div>
                <div className={style.cardInfo}>
                    <div>
                        <span>Expiration Date</span>
                        <div>
                            <input {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} value={expiryDate} 
                                                            onPaste={(event) => event.preventDefault()}/>
                            <i className="fa-regular fa-calendar-days"></i>
                        </div>
                    </div>
                    <div>
                        <span>Security Code</span>
                        <div>
                            <input {...getCVCProps({ onChange: handleChangeCVC })} value={cardCVVV} type="password"
                                                    placeholder="CVV/CVC" onPaste={(event) => event.preventDefault()}/>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                    </div>
                </div>
                <div className={style.cardHolder}>
                    <span>Name On Card</span>
                    <div>
                        <input type="text" id="cardHolder" maxLength="102" placeholder="Card Holder" autoComplete="off"
                        value={cardHolder} onChange={handleChangeCardHolder}/>
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
                <button type="submit">Complete Payment</button>
            </form>
        </div>
    </div>
  );
}

//local Component
let SuccessMessage = React.forwardRef((props ,ref) => {

    let hideSuccessMessage = () => {
        ref.current.style.display = "none";
    }
    
    return (
        <div className={style.successMessage} ref={ref}>
            <div>
                <p>Your order has been successfully accepted !</p>
                <p>You receive the confirmation letter on your email when order will be handled.
                    Usually it takes no more than several minutes.
                </p>
                <Link to="/main">
                    <button onClick={hideSuccessMessage}>Ok</button>
                </Link>
            </div>
        </div>
    );
});

export default UserPayment;