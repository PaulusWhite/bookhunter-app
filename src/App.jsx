import {  BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useContext, useState, useLayoutEffect } from "react";

//fireBase
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

//Contexts
import { Context } from "./context/Context";

//Actions
import { recheckBasketData, checkIsAppAccessible } from "./context/actions";

//Utils 
import { getCurrentUserData } from "./utils/firebaseFunctions";

//Plugins

//Components
import Header from './components/header/Header';
import Nav from "./components/nav/Nav";
import Authorization from "./components/authorization/Authorization";
import UserProfilePanel from "./components/userProfilePanel/UserProfilePanel";
import Veil from "./components/veil/Veil";
import SideCart from "./components/sideCart/SideCart";
import Main from "./components/pages/main/Main";
import Catalog from "./components/pages/catalog/Catalog";
import ReviewBookItem from "./components/common/reviewBookItem/ReviewBookItem";
import About from "./components/pages/about/About";
import Selections from "./components/pages/selections/Selections";
import Cart from "./components/pages/cart/Cart";
import Footer from "./components/footer/Footer";
import Preloader from "./components/common/preloader/Preloader";
import Checkout from "./components/pages/checkout/Checkout";
import Spinner from "./components/common/spinner/Spinner";
import PageIsNotFound from "./components/pageIsNotFound/PageIsNotFound";
import AppIsNotAvailable from "./components/appIsNotAvailable/AppIsNotAvailable";

function App() {
  let { dispatch, isUserAuth } = useContext(Context);
  let [firstLoading, setFirstLoading] = useState(true);
  let [isAppAccessible, setIsAppAccessible] = useState(true);
  useEffect( () => {
    dispatch( {type:"SET_LOADING"} );

    //As google books api doesn't work in some countries (for example Belarus)
    //it is needed to check out does api work, so we have to make first test request
    let checkIsAppAccessibleForUser = async () => {
      let isAppAccessible = await checkIsAppAccessible();
      !isAppAccessible && setIsAppAccessible(false);
    }
    
    checkIsAppAccessibleForUser();

    let setActualBasketData = async () => {
      let basketData = await recheckBasketData();
      dispatch( {type: "SET_BASKET_DATA", payload: basketData});
      setFirstLoading(false);
    }

    onAuthStateChanged(auth, async (user) => {
      if (user && !isUserAuth) {
        try{
          let currentUserData = await getCurrentUserData(auth);
          dispatch( {type: "SET_CURRENT_USER", payload: currentUserData} );
          setActualBasketData();
        }catch(error){
          console.log(error.message)
        }
      }else {
        setActualBasketData();
      }
    });

  }, [dispatch, isUserAuth]);

  if(!isAppAccessible) return <AppIsNotAvailable />

  return (
    <BrowserRouter>
      <WrapperForAutoScroll>
        <Spinner />
        {firstLoading && <Preloader />}
        <Header />
        {isUserAuth ? <UserProfilePanel /> : <Authorization />}
        <SideCart />
        <Veil />
        <Routes>
          <Route index element={<Nav />} />
          <Route path="/:page/*" element={<Nav />} />
        </Routes>
        <main style={{position:"relative"}}>
          <Routes>
            <Route index element={<Main />} />
            <Route path="main/*" element={<Main />} />
            <Route path="catalog/*" element={<Catalog />} />
            <Route path="selections/:idSelection/*" element={<Selections />} />
            <Route path="about/*" element={<About />} />
            <Route path="cart/*" element={<Cart />} />
            <Route path="review/:idBook/*" element={<ReviewBookItem />} />
            <Route path="checkout/*" element={<Checkout />} />
            <Route path="*" element={<PageIsNotFound />} />
          </Routes>
        </main>
        <Footer />
      </WrapperForAutoScroll>
    </BrowserRouter>
  );
}

//Wrapper for Autoscrolling after route changing
function WrapperForAutoScroll ({children}){
  let location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
}

export default App;
