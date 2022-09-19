import style from "./preview.module.scss";

import { useEffect, useContext } from "react";

//Contexts
import { Context } from "../../../../context/Context";

//Actions
import { getSelection } from "../../../../context/actions";

//Components
import CompilationItem from "../../../common/compilation/CompilationItem";
import PreviewBookItem from "../../../common/previewBookItem/PreviewBookItem";
import Preloader from "../../../common/preloader/Preloader";

function Preview(props) {
    let preview = props.textContent; //preview text content
    let topFive = preview.topFive; //topFive text content

    let { main, isLoading, dispatch } = useContext(Context);
    let popularBooks = main.preview.popular; //popular books data from Context
    let recommendedBooks = main.preview.recommended;
    let lengthAllPreview = popularBooks.length + recommendedBooks.length;
    
    //items for render ↓
    let topFiveItems = topFive.map( item => {
        return <CompilationItem key={item.id} {...item} />
    }); 

    let popularBooksItems = popularBooks.map( item => {
        return <PreviewBookItem key={item.id} {...item} />
    });
    
    let recommendedBooksItems = recommendedBooks.map( item => {
        return <PreviewBookItem key={item.id} {...item} />
    });

    useEffect( () => {
        let getPopularBooks = async () => {
            let data = await getSelection(1007, "popularPreview");
            dispatch( {type:"GET_DEFAULT_POPULAR", payload: data} );
        }

        let getRecommendedBooks = async () => {
            let data = await getSelection(1008, "recommendedPreview");
            dispatch( {type:"GET_DEFAULT_RECOMMENDED", payload: data})
        }

        if(lengthAllPreview === 0){
            dispatch( {type: "SET_LOADING"});
            getPopularBooks();
            getRecommendedBooks();
        }
    }, [dispatch, lengthAllPreview]);

    if(isLoading) return <Preloader />;

  return (
    <div className={style.preview}>
        <p className={style.topicPreview}>
            Top five
        </p>
        <div className={style.topFiveSection}>
            {topFiveItems}
        </div>
        <div className={style.specialSection}>
            <div className={style.background}></div>
            <p className={style.topicPreview}>
                The most popular books
            </p>
            <div className={style.popularBlock}>
                {popularBooksItems}
            </div>
            <p className={style.topicPreview}>
                This month's recommended books
            </p>
            <div className={style.recommendedBlock}>
                {recommendedBooksItems}
            </div>
            <div className={style.quote}>
                <span>THERE'S NO</span>
                <span>SUCH THING</span>
                <span>AS TOO</span>
                <span>MANY BOOKS</span>
            </div>
        </div>
    </div>
  );
}

export default Preview;