import style from "./searchResult.module.scss";

import React, { useContext, useEffect, useState, useRef } from "react";

//Contexts
import { Context } from "./../../../../context/Context";

//Actions
import { sortByPrice } from "../../../../context/actions";
import { getBooksBySearch } from "./../../../../context/actions";

//Components
import PreviewBookItem from "../../../common/previewBookItem/PreviewBookItem";

function SearchResult(props) {
  let { catalog, dispatch } = useContext(Context);
  let [paginationIndex, setPaginationIndex] = useState(40); //40 max value for google books api
  let [isMoreResult, setMoreResult] = useState(true);
  let resultItems = catalog.resultItems;
  let sortingPanel = useRef();
  let booksResult = useRef();
  let isResult = typeof resultItems === "string" ? false : true;

  //BooksList 
  let resultItemsArr = isResult ? resultItems.map( item => <PreviewBookItem key={item.id} {...item} />) : resultItems;

  let handleChangeSort = (event) => {
    let sortType = event.target.id;
    let allInputs = document.querySelectorAll(`.${sortingPanel.current.className} input`);

    allInputs.forEach( input => {
      let label = input.nextElementSibling;
      sortType === input.id ? label.classList.add(`${style.activeLabel}`) : label.classList.remove(`${style.activeLabel}`);
    });

    let sortedItems = sortByPrice(resultItems, sortType);
    
    dispatch( {type:"SORT_BY_PRICE", payload:sortedItems} );
  }

  let showMoreResult = async () => {
    dispatch( {type: "SET_LOADING"})
    let [searchData, isMoreResult] = await getBooksBySearch(props.inputValue, paginationIndex, resultItems); //search result
    setMoreResult(isMoreResult);

    setPaginationIndex(paginationIndex += 40);

    dispatch( {type:"SET_SEARCH_ITEMS", payload:searchData} );
  }

  useEffect( () => {
    let sortByActiveInput = () => {
      let allInputs = document.querySelectorAll(`.${sortingPanel.current.className} input`);
      let activeInput; 

      allInputs.forEach( input => input.checked && (activeInput = input));

      let sortedItems = sortByPrice(resultItems, activeInput.id);

      dispatch( {type:"SORT_BY_PRICE", payload:sortedItems} );
    }

    //scroll to result after search
    if(resultItems.length > 0 && resultItems.length <= 40){
      setTimeout( () => {
        booksResult.current && booksResult.current.scrollIntoView( {behavior: "smooth"} );
      }, 350);
    }

    sortingPanel.current && isResult && sortByActiveInput(); //sort by active input by default
  }, [resultItems, isResult, dispatch]);
  
  if(!isResult) return <WrongRequest wrongRequest={resultItems} />

  if(resultItems.length > 0){
    return (
      <div className={style.searchResult}>
        <p>Search result</p>
        <div className={style.commonBlock}>
          <aside className={style.asidePanel}>
            <p>Sort price by</p>
            <hr />
            <div className={style.sortingPanel} ref={sortingPanel}>
              <div>
                <input type="radio" id="default" name="sortPrice" defaultChecked onChange={handleChangeSort}/>
                <label htmlFor="default" className={style.activeLabel}>Default</label>
              </div>
              <div>
                <input type="radio" id="increase" name="sortPrice" onChange={handleChangeSort}/>
                <label htmlFor="increase">Price increase</label>
              </div>
              <div>
                <input type="radio" id="descending" name="sortPrice" onChange={handleChangeSort}/>
                <label htmlFor="descending">Price descending</label>
              </div>
            </div>
          </aside>
          <div className={style.books} ref={booksResult}>
            {resultItemsArr}
          </div>
        </div>
        {isMoreResult && <button className={style.showMoreBtn} onClick={showMoreResult}>Show more</button>}
      </div>
    );
  }
}

//Local Component
function WrongRequest(props) {
  return (
    <div className={style.wrongRequest}>
      <p>There is nothing has been found by request " {props.wrongRequest} "</p>
      <p>Please check your request spelling or rephrase one</p>
    </div>
  );
}

export default React.memo(SearchResult);