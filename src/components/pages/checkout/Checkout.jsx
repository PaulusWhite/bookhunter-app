import style from "./checkout.module.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Utils
import { getBasketData } from "../../../utils/useLocalStorage";

//Components
import UserPayment from "./userPayment/UserPayment";
import DeliveryAddress from "./deliveryAddress/DeliveryAddress";

function Checkout() {
  let basketData = getBasketData();
  let navigate = useNavigate();
  let [payment, setPayment] = useState(false);

  useEffect( () => {
    //redirect if there is nothing to formalize
    !basketData.length && navigate("../catalog", { replace: true });
  }, []);
  
  return (
    <div className={style.checkout}>
        <p>Checkout</p>
        {!payment ? <DeliveryAddress goPayment={setPayment}/> : <UserPayment />}
    </div>
  );
}

export default Checkout;