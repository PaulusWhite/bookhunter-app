import style from "./appIsNotAvailable.module.scss";

function AppIsNotAvailable() {
  return (
    <div className={style.appIsNotAvailable}>
        <p>Unfortunately this resource is not available in your area</p>
    </div>
  );
}

export default AppIsNotAvailable;