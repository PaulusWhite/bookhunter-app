import style from "./myOrders.module.scss";

import { useState } from "react";
import { Link } from "react-router-dom";  

//Imgs
import errorIcon from "../../../assets/catalog/errorIcon.svg";

function MyOrders(props) {
    let [ currentOption, setOption ] = useState("completed");
    let allOrders = [...props.completed, ...props.returned];
    let optionOrders = currentOption === "all" ? allOrders : props[currentOption];

    let ordersInfoArr = optionOrders.map( (option, index) => {
        return <OrderInfo key={index} {...option} currentOption={currentOption}/>
    });

  return (
    <div className={style.myOrdersTab}>
        <select name="ordersInfo" onChange={(event) => setOption(event.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="returned">Returned</option>
        </select>
        <div className={style.ordersInfo}>
            {ordersInfoArr.length > 0 ? ordersInfoArr : <OrdersAbsence />}
        </div>
    </div>
  );
}

//localFunction
function OrderInfo(props) {
    
    let imgLoaded = (event) => {
        let imgBox = event.target.parentElement;
        imgBox.classList.remove(style.imgLoading);
    }

    let allItems = props.items.map( item => {
        return (
            <Link to={`/review/${item.id}`} target="_blank" key={item.id}>
                <div className={`${style.imgBox} ${style.imgLoading}`}>
                    <span className={style.itemAmount}>{item.amount}</span>
                    <img src={item.img ? item.img : errorIcon} alt="bookImg" onLoad={imgLoaded}/>
                </div>
            </Link >
        )
    });

    return (
        <div className={style.orderInfo}>
            <div className={style.dateAndSum}>
                <span className={style.orderTotalSum}>{props.totalSum}</span>
                <span className={style.orderTotalSum}>{props.orderDate}</span>
            </div>
            <div className={style.itemsList}>
                {allItems}
            </div>
        </div>
    );
}

function OrdersAbsence() {
    return (
        <div className={style.ordersAbsence}>
            <p>There is no orders in this option</p>
            <i className="fa-solid fa-cart-arrow-down"></i>
        </div>
    );
}

export default MyOrders;