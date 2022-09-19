import style from "./sideCart.module.scss";

import { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

//Contexts
import { Context } from "../../context/Context";

//Utils
import { getBasketTotalPrice, getBasketData } from "../../utils/useLocalStorage";

//Plugins
import showSideCart from "../../plugins/sideCart/showSideCart";

//Components
import SideCartItem from "./sideCartItem/SideCartItem";

function SideCart() {
    let sideBasket = useRef();
    let hideBtn = useRef();
    let toCartBtn = useRef();
    let { basketData, dispatch } = useContext(Context);
    let totalPrice = getBasketTotalPrice();

    let updateBasket = () => {
        dispatch( {type: "SET_BASKET_DATA", payload: getBasketData()});
    }

    let basketArr = basketData.map( book => {
        return (
          <SideCartItem key={book.id} {...book} updateBasket={updateBasket} />
        );
    });

    useEffect( () => {
        showSideCart(sideBasket.current, style.showCart, hideBtn.current, toCartBtn.current);
    }, []);

  return (
    <div className={style.sideCart} ref={sideBasket}>
        <div className={style.cartHeader}>
            <i className="fa-solid fa-angle-right" ref={hideBtn}></i>
            <span>Cart</span>
        </div>
        <div className={style.bookList}>
            {basketArr}
            {basketArr.length === 0 && <p className={style.emptyMessage}>Your cart is empty</p>}
        </div>
        {basketArr.length !== 0 && <TotalPrice totalPrice={totalPrice}/>}
        <div className={style.cartBottom}>
            <Link to="/cart">
                <button ref={toCartBtn}>Go To Cart</button>
            </Link>
        </div>
    </div>
  );
}

//local Component
let TotalPrice = (props) => {
    let totalPrice = props.totalPrice;
    return (
        <div className={style.totalPrice}>
            <p>Total Price</p>
            <p>{totalPrice}</p>
        </div>
    );
}

export default SideCart;