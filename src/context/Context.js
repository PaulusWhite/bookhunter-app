import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

let Context = createContext();

let StoreProvider = ({children}) => {
    let initialState = {
        isUserAuth: false,
        userData: {},
        isLoading: false,
        main: {
            preview:{
                popular: [],
                recommended: [],
            }
        },
        catalog: {
            resultItems: [],
        },
        reviewBook: {
            id: null,
            volumeInfo: {},
        },
        basketData: [], //cartData
        selectionList: [], //current books selection data on selections page
    }

    let [state, dispatch] = useReducer(Reducer, initialState);

    return <Context.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </Context.Provider>
}

export { Context, StoreProvider }
