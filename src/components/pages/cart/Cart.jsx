import style from "./cart.module.scss";

import { useContext } from "react"
import { Link } from "react-router-dom";

//Contexts
import { Context } from "../../../context/Context";

//Utils
import { getBasketTotalPrice, getBasketData } from "../../../utils/useLocalStorage";

//Components
import CartItem from "./cartItem/CartItem";

function Cart() {
  let { basketData, dispatch } = useContext(Context);
  let totalPrice = getBasketTotalPrice();

  let updateBasket = () => {
    dispatch( {type: "SET_BASKET_DATA", payload: getBasketData()});
  }
  
  let basketArr = basketData.map( book => {
    return (
      <CartItem key={book.id} {...book} updateBasket={updateBasket}/>
    );
  });

  if(basketData.length === 0){
    return (
      <div className={style.emptyCart}>
        <p>Your Cart is empty</p>
        <Link to="/catalog"><i className="fa-solid fa-cart-arrow-down"></i></Link>
      </div>
    );
  }

  return (
    <div className={style.cart}>
      <div className={style.bookList}>
          <p>My Cart</p>
          {basketArr}
      </div>
      <div className={style.totalPrice}>
          <p>Total Price:</p>
          <span id={style.total}>{totalPrice}</span>
          <Link to="/checkout"><button>Checkout</button></Link>
      </div>
    </div>
  );
}

export default Cart;