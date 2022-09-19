import style from "./myProfile.module.scss";

function MyProfile(props) {
  return (
    <div className={style.profileDetails}>
        <div className={style.row}>
            <span>First Name:</span>
            <span>{props.firstName}</span>
        </div>
        <div className={style.row}>
            <span>Last Name:</span>
            <span>{props.lastName}</span>
        </div>
        <div className={style.row}>
            <span>Email:</span>
            <span>{props.email}</span>
        </div>
        <div className={style.row}>
            <span>Date of registration:</span>
            <span>{props.registrationDate}</span>
        </div>
        <div className={style.row}>
            <span>My personal ID:</span>
            <span>{props.personalID}</span>
        </div>
    </div>
  );
}

export default MyProfile;