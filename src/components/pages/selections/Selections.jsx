import style from "./selections.module.scss";

import { useContext } from "react";
import { useParams } from "react-router-dom";

//Contexts
import { CustomTextContext } from "../../../context/CustomTextContext";

//Components
import CompilationItem from "../../common/compilation/CompilationItem";
import Selection from "./selection/Selection";

function Selections() {
  let idSelection = useParams().idSelection;
  let context = useContext(CustomTextContext);
  let pageTextContent = context.compilations;

  let compilationsArr = pageTextContent.map( compilation => {
    return (
      <CompilationItem key={compilation.id} {...compilation} />
    );
  });

  if(idSelection === "all"){
    return (
      <div className={style.selections}>
        <h1>Our selections</h1>
        <div className={style.compilations}>
          {compilationsArr}
        </div>
      </div>
    );
  }

  return <Selection idSelection={+idSelection}/>
}

export default Selections;