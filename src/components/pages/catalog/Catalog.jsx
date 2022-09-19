import style from "./catalog.module.scss";

import { useState, useContext } from "react";

//Contexts
import { Context } from "./../../../context/Context";

//Actions
import { getBooksBySearch } from "./../../../context/actions";

//Components
import SearchResult from "./searchResult/SearchResult";

function Catalog() {
  let [searchData, setSearchData] = useState("");

  return (
    <div className={style.catalog}>
      <div className={style.searchBlock}>
        <p>Find your book</p>
        <SearchField setSearchData={setSearchData}/>
      </div>
      <SearchResult searchValue={searchData}/>
    </div>
  );
}

//Local Components
function SearchField(props) {
  let { dispatch } = useContext(Context);
  let [inputValue, setInputValue] = useState("");

  let typeInputValue = (event) => {
    if(event.target.value.length > 150) return;
    setInputValue(event.target.value);
  }

  let getBooks = async () => {
    if(inputValue.length === 0 || inputValue[0] === " ") return;
    props.setSearchData(inputValue);

    dispatch( {type:"SET_LOADING"} );

    let [searchData] = await getBooksBySearch(inputValue, 0, []); //search result

    setInputValue("");
    dispatch( {type:"SET_SEARCH_ITEMS", payload:searchData} );
  }

  let enterClick = (event) => {
    if(inputValue.length === 0 || inputValue[0] === " ") return;

    if (event.keyCode === 13) {
      dispatch( {type:"SET_LOADING"});
      getBooks();
    }
  }
  
  return (
    <div className={style.searchField}>
      <input value={inputValue} placeholder="Enter book title ..." 
              onChange={typeInputValue} onKeyDown={enterClick}/>
      <button onClick={getBooks}>Search</button>
    </div>
  );
}



export default Catalog;