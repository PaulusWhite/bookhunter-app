// let GET_BOOKS_LIST = "GET_BOOKS_LIST"; ???
let SET_BASKET_DATA = "SET_BASKET_DATA";
let GET_DEFAULT_POPULAR = "GET_DEFAULT_POPULAR";
let GET_DEFAULT_RECOMMENDED = "GET_DEFAULT_RECOMMENDED";
let SET_LOADING = "SET_LOADING";
let SET_SEARCH_ITEMS = "SET_SEARCH_ITEMS";
let SORT_BY_PRICE = "SORT_BY_PRICE";
let SET_REVIEW_BOOK = "SET_REVIEW_BOOK";
let SET_SELECTION = "SET_SELECTION";
let SET_CURRENT_USER = "SET_CURRENT_USER";
let SET_UNAUTHORIZED_USER = "SET_UNAUTHORIZED_USER";

let Reducer = (state, action) => {
    switch (action.type){
        case SET_BASKET_DATA:
            return {
                ...state,
                basketData: action.payload,
                isLoading: false,
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case GET_DEFAULT_POPULAR:
            return {
                ...state,
                isLoading: false,
                ...state.main.preview.popular = action.payload,
            }
        case GET_DEFAULT_RECOMMENDED:
            return {
                ...state,
                isLoading: false,
                ...state.main.preview.recommended = action.payload, 
            }
        case SET_SEARCH_ITEMS:
            return {
                ...state,
                isLoading: false,
                ...state.catalog.resultItems = action.payload,
            }
        case SORT_BY_PRICE:
            return {
                ...state,
                isLoading: false,
                ...state.catalog.resultItems = action.payload,
            }
        case SET_REVIEW_BOOK:
            return {
                ...state,
                isLoading: false,
                reviewBook: action.payload,
            }
        case SET_SELECTION:
            return {
                ...state,
                isLoading: false,
                selectionList: action.payload,
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isUserAuth: true,
                userData: action.payload,
            }
        case SET_UNAUTHORIZED_USER:
            return {
                ...state,
                isUserAuth: false,
                userData: {},
            }
        default:
        return state;
    }
}

export default Reducer;