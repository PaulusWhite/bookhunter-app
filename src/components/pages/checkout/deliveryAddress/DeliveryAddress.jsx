import style from "./deliveryAddress.module.scss";

import { useState } from "react";

function DeliveryAddress(props) {
  let [name, setName] = useState("");
  let [state, setState] = useState("");
  let [city, setCity] = useState("");
  let [zipCode, setZipCode] = useState("");
  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");

  let handleChangeName = (event) => {
    let value = event.target.value;
    value[0] === " " && (value = value.trim());
    if(/[a-zA-Z ]+$/.test(" " + value)){
      setName(value);
    }
  }

  let handleChangeState = (event) => {
    let value = event.target.value;
    value[0] === " " && (value = value.trim());
    if(/[a-zA-Z ]+$/.test(" " + value)){
      setState(value);
    }
  }

  let handleChangeCity = (event) => {
    let value = event.target.value;
    value[0] === " " && (value = value.trim());
    if(/[a-zA-Z ]+$/.test(" " + value)){
      setCity(value);
    }
  }

  let handleChangeZipCode = (event) => {
    let value = event.target.value;
    value[0] === " " && (value = value.trim());
    if(/[0-9 ]+$/.test(" " + value)){
      setZipCode(value.trim());
    }
  }

  let handleChangeAddress = (event) => {
    let value = event.target.value;
    value[0] === " " && (value = value.trim());
    if(/[a-zA-Z0-9,/ ]+$/.test(" " + value)){
      setAddress(value);
    }
  }
  
  let handleChangePhone = (event) => {
    let value = event.target.value;
    value[0] === " " && (value = value.trim());
    if(/[0-9-+ ]+$/.test(" " + value)){
      setPhone(value);
    }
  }

  let handleForm = (event) => {
    event.preventDefault();
    let allInputs = document.querySelectorAll(`#deliveryAddressForm input`);
    let counter = 0; //counter for permission

    allInputs.forEach( input => {
      input.classList.add(style.wrongInput);
      if(input.value.length > 0){
        input.classList.remove(style.wrongInput);
        counter++;
      }
    });
    counter === 6 && props.goPayment(true);
  }

  return (
    <div className={style.deliveryAddress}>
      <p>Delivery Address</p>
      <form id="deliveryAddressForm" onSubmit={handleForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleChangeName} maxLength="50"/>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" id="state" value={state} onChange={handleChangeState} maxLength="100"/>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={handleChangeCity} maxLength="100"/>
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input type="text" id="zipCode" value={zipCode} onChange={handleChangeZipCode} maxLength="10"/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={handleChangeAddress} maxLength="100"/>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" value={phone} onChange={handleChangePhone} maxLength="21"/>
        </div>
        <button>Payment</button>
      </form>
    </div>
  );
}

export default DeliveryAddress;