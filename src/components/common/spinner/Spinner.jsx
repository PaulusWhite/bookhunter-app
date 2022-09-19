import style from "./spinner.module.scss";
import { useContext, useEffect } from "react";

//Contexts
import { Context } from "../../../context/Context";

//Plugins
import displaySpinner from "../../../plugins/common/displaySpinner";

function Spinner() {
  let { isLoading } = useContext(Context);
  isLoading ? displaySpinner(true) : displaySpinner(false);

  return (
      <div className={style.loadingSpinner} id="spinner">
        <div className={style.spinner}></div>
      </div>
  );
}

export default Spinner;