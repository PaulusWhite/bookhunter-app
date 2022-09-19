import style from "./caroosel.module.scss";

import { useEffect, useRef, useState } from "react";

//imgs
import slide1 from "../../../../assets/main/slide1.webp";
import slide2 from "../../../../assets/main/slide2.webp";
import slide3 from "../../../../assets/main/slide3.webp";

//Plugins
import caroosel from "../../../../plugins/main/caroosel";

function Caroosel() {
  let slideLine = useRef();
  let arrowRight = useRef();
  let arrowLeft = useRef();
  let taglinesBlock = useRef();
  let firstSlie = useRef();
  let [state, updateState] = useState(1);
  
  useEffect( () => {
    let carooselAction = () => {
      return setInterval( () => {
        caroosel(slideLine.current, style.animation, "auto", null, null, taglinesBlock.current);
      }, 6000);
    }

    let intervalId = carooselAction(); //interval id in EventLoop

    arrowRight.current.onclick = () => {
      caroosel(slideLine.current, style.animation, "right", arrowRight.current, arrowLeft.current, taglinesBlock.current);
      window.clearInterval(intervalId); 
      updateState(state = state+1); 
    }

    arrowLeft.current.onclick = () => {
      caroosel(slideLine.current, style.animation, "left", arrowRight.current, arrowLeft.current, taglinesBlock.current);
      window.clearInterval(intervalId);
      updateState(state = state+1);  
    }

    return () => {
      window.clearInterval(intervalId);
    }
  }, [state]);

  return (
    <div className={style.caroosel}>
        <div className={style.slideLine} ref={slideLine}>
          <div className="activeSlide" ref={firstSlie} style={{backgroundImage: `url("${slide1}")`}} data-alt="slide1">
          </div>
          <div style={{backgroundImage: `url("${slide2}")`}} data-alt="slide2">
          </div>
          <div className="lastSlide" style={{backgroundImage: `url("${slide3}")`}} data-alt="slide3">
          </div>
        </div>
        <div className={style.taglinesBlock} style={{opacity:1, top:"50%"}} ref={taglinesBlock}>
          <p className={style.preliminarysLogan}>Choose any book you like !</p>
          <div className={style.tagline}>
            <p className={style.topTagline}>
              a good book is
            </p>
            <p className={style.bottomTagline}>
              endless
            </p>
          </div>
        </div>
        <span className={style.aroowRight}>
          <i className="fa-solid fa-chevron-right" ref={arrowRight}></i>
        </span>
        <span className={style.aroowLeft}>
          <i className="fa-solid fa-chevron-left" ref={arrowLeft}></i>
        </span>
    </div>
  );
}

export default Caroosel;