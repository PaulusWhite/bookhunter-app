import { useContext } from "react";

//Contexts
import { CustomTextContext } from "../../../context/CustomTextContext";

//Components
import Caroosel from "./caroosel/Caroosel";
import Preview from "./preview/Preview";
import RecommendetToday from "./recommendetToday/RecommendetToday";

function Main() {
  let context = useContext(CustomTextContext);
  let pageTextContent = context.mainPage;

  return (
    <>
      <Caroosel />
      <Preview textContent={pageTextContent.preview}/>
      <RecommendetToday textContent={pageTextContent.specialBook} />
    </>
  )
}

export default Main;