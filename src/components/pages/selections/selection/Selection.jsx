import style from "./selection.module.scss";

import { useEffect, useContext } from "react";

//Contexts
import { Context } from "../../../../context/Context";
import { CustomTextContext } from "../../../../context/CustomTextContext";

//Actions
import { getSelection } from "../../../../context/actions";

//Utils
import { replaceDescription } from "../../../../utils/getBookDataForView";

//Components
import PreviewBookItem from "../../../common/previewBookItem/PreviewBookItem";
import Preloader from "../../../common/preloader/Preloader";

function Selection(props) {
  let idSelection = props.idSelection;
  let { selectionList, dispatch, isLoading } = useContext(Context);
  let { compilations } = useContext(CustomTextContext);
  
  let heading = compilations.find( compilation => compilation.id === idSelection).title;

  let selectionArr = selectionList && selectionList.map( item => {
    let description = replaceDescription(item.volumeInfo.description);

    return (
      <div className={style.selectionBook} key={item.id}>
        <PreviewBookItem {...item} />
        <p className={style.description}>
          {description}
        </p>
      </div>
    );
  });

  useEffect( () => {
    dispatch( {type: "SET_LOADING"} );

    let getSelectionData = async () => {
      let selectionData = await getSelection(idSelection, heading);
      dispatch( {type: "SET_SELECTION", payload: selectionData} );
    }

    getSelectionData();
  }, [idSelection, dispatch, heading]);

  if(isLoading) return < Preloader />

  return (
    <div className={style.selection}>
        <h1>{heading}</h1>
        {selectionArr}
    </div>
  );
}

export default Selection;