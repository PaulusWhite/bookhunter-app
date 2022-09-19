import style from "./fastSearch.module.scss";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Contexts
import { Context } from "../../../context/Context";

//Actions
import { getBooksBySearch } from "../../../context/actions";

function FastSearch() {
    let { dispatch } = useContext(Context);
    let [inputValue, setInputValue] = useState("");
    let navigate = useNavigate();

    let typeInputValue = (event) => {
        if(event.target.value.length > 150) return;
        setInputValue(event.target.value);
    }

    let enterClick = (event) => {
        if(inputValue.length === 0 || inputValue[0] === " ") return;

        if (event.keyCode === 13) {
          dispatch( {type:"SET_LOADING"});
          getBooks();
        }
    }

    let getBooks = async () => {
      if(inputValue.length === 0 || inputValue[0] === " ") return;
    
      dispatch( {type:"SET_LOADING"} );
      navigate("/catalog");
    
      let [searchData] = await getBooksBySearch(inputValue, 0, []); //search result
    
      setInputValue("");
      dispatch( {type:"SET_SEARCH_ITEMS", payload:searchData} );
    }

  return (
    <div className={style.fastSearch}>
      <span>
        <input type="text" placeholder="Search" value={inputValue} onKeyDown={enterClick} 
                onChange={typeInputValue} />
        <i className="fa-solid fa-magnifying-glass" onClick={getBooks}></i>
      </span>
    </div>
  );
}

export default FastSearch;