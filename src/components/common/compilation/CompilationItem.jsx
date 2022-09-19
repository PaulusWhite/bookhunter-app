import style from "./compilation.module.scss";

import { Link } from "react-router-dom";

function CompilationItem(props) {
  let compilationId = props.id;
  
  return (
    <div className={style.compilationItem}>
      <Link to={`/selections/${compilationId}`}>
        <img src={require(`../../../assets/compilationImages/${props.img}`)} alt="imgCompilation" />
        <p>{props.title}</p>
        <div className={style.hoverCover}></div>
        <i className="fa-solid fa-eye"></i>
      </Link>
    </div>
  );
}

export default CompilationItem;