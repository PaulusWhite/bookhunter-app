//Utils
import { getBasketData } from "../utils/useLocalStorage";
import { setPreviewData, checkLocalPreviewData, checkIsAccessDenied, setAccessDenied } from "../utils/useSessionStorage";
import getCurrentData from "../utils/getCurrentData";

//fireBase
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        updateEmail,
        updatePassword,
        reauthenticateWithCredential,
        EmailAuthProvider,
        deleteUser  } from "firebase/auth";
import { setDoc, doc, updateDoc, deleteDoc  } from "firebase/firestore"; 

let URL = "https://www.googleapis.com/books/v1/volumes?q="; //basic URL
let KEY = "AIzaSyBKzavR6wS2P8wZwhDeTlG0B6DcZLiYJ34"; //API key
let USER_ID = "116921473898145884256"; //user id whose bookshelf (selection) we use
//

//Check out is app accessible for user
//As google books api doesn't work in some countries (for example Belarus)
//it is needed to check out does api work, so we have to make first test request
let checkIsAppAccessible = async () => {
    let isAccessDenied = checkIsAccessDenied()
    if(isAccessDenied) return false;

    let response = await fetch(`${URL}${"something"}&key=${KEY}`);
    let resultData = await response.json();
    let totalItems = resultData.totalItems; //in normal case response reclaims us a lot of item
    
    if(!totalItems){
        setAccessDenied();
        return false; //if there is no any items that means api doesn't work in user location
    }else return true;
}

//get Review Book
let getReviewBook = async (id) => {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    let item = await response.json();
    return item;
}

let recheckBasketData = async () => {
    !localStorage.getItem("basket") && localStorage.setItem("basket", JSON.stringify([]));
    let data = getBasketData();
    if(data.length === 0) return data;

    //check if currency and prices has been changed for user location
    let oldCurrencyValue = data[0].currency; //get first value from basket
    let item = await getReviewBook(data[0].id);
    let actualCurrencyValue = item.saleInfo.retailPrice.currencyCode;
    if(oldCurrencyValue !== actualCurrencyValue){
        localStorage.setItem("basket", JSON.stringify([])); //clear basket if currency and prices for user location has been changed
        return [];
    }else{
        return data;
    } 
}

//get selection (bookshelf) & get default preview books
let getSelection = async (selectionId, previewTitle) => {
    let localData = checkLocalPreviewData(previewTitle);
    if(localData !== null) return localData;

    let response = await fetch(`https://www.googleapis.com/books/v1/users/${USER_ID}/bookshelves/${selectionId}/volumes?key=${KEY}`);
    let data = await response.json();

    setPreviewData(data.items, previewTitle);
    
    return data.items;
}

//get search books
let getBooksBySearch = async (textRequest, paginationIndex, previousResultItems) => {
    let response = await fetch(`${URL}${textRequest}&langRestrict=en&maxResults=40&filter=paid-ebooks&startIndex=${paginationIndex}&key=${KEY}`);
    let resultData = await response.json();
    let resultItems = resultData.items;
    let totalItems = resultData.totalItems;

    if(totalItems === 0) return [textRequest];

    let nextPaginationIndex = paginationIndex + 40;
    let isMoreResult = nextPaginationIndex >= totalItems ? false : true;

    let indexNumber = previousResultItems.length; //last index number of previousResultItems
    
    if(!resultItems) return [ [...previousResultItems] , false];

    let actualResultItems = resultItems.filter( item => {
        let flag = true;
        let isForSale = item.saleInfo.saleability;
        if(isForSale === "NOT_FOR_SALE" || isForSale ===  "FOR_RENTAL_ONLY") return false;
        previousResultItems.forEach( previousItem => {
            if(previousItem.id === item.id) flag = false;
        });
        if(flag){
            indexNumber++;
            item.indexNumber = indexNumber;
            return item;
        }
    });
    actualResultItems = [...actualResultItems, ...previousResultItems];

    return [actualResultItems, isMoreResult, textRequest];
}

//sort by price
let sortByPrice = (items, sortType) => {
    if(sortType === "default"){
        items.sort( (a, b) => {
            if(a.indexNumber > b.indexNumber) return 1;
            if(a.indexNumber < b.indexNumber) return -1;
        });
    }else{
        items.sort( (a, b) => {
            let priceA = a.saleInfo.retailPrice ? a.saleInfo.retailPrice.amount : a.saleInfo.retailPrice.amount = 0;
            let priceB = b.saleInfo.retailPrice ? b.saleInfo.retailPrice.amount : b.saleInfo.retailPrice.amount = 0;
            return sortType === "increase" ? priceA - priceB : priceB - priceA;
        });
    }
    return items;
}

// Actions for Authorization ↓
//Login
let login = async (userData) => {
    try{
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
        return [true];
    }catch(error){
        return [false, error.code];
    }
}

//User Registration
let userRegistration = async (userData) => {
    try{
        let response = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        let userID = response.user.uid;
        await setDoc(doc(db, "users", userID), {
            firstName: userData.firstName,
            lastName: userData.lastName,
            nickName: userData.nickName,
            email: userData.email,
            personalID: userID,
            registrationDate: getCurrentData(),
            orders: {
                completed: [],
                returned: [],
            },
            userPhoto: "",
        });
    }catch (error) {
        return [false, error.code];
    }
    return [true];
}

//Sign out
let logOut = async () => {
    try{
        await signOut(auth);
    }catch(error){
        console.log(error.message);
    }
}

//Update User Data
let updateUserData = async (userID, changingData, dataType) => {
    let userDataRef = doc(db, "users", userID);
    let updatingData = {};

    let currentPassword = changingData[0].currentPassword;
    changingData.forEach( data => updatingData[data.field] = data.value);

    if(dataType === "auth"){
        let changedAuthData = Object.keys(updatingData)[0];
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword,
        );
        try{
            await reauthenticateWithCredential(auth.currentUser, credential);
            if(changedAuthData === "email"){
                await updateEmail(auth.currentUser, updatingData.email);
                updateDoc(userDataRef, updatingData);
            }
            if(changedAuthData === "newPassword"){
                await updatePassword(auth.currentUser, updatingData.newPassword);
            }
            if(changedAuthData === "deleteProfile"){
                await deleteUser(auth.currentUser);
                await deleteDoc(doc(db, "users", userID));
            }
            return changedAuthData === "deleteProfile" ? [true, "deleted"] : [true];
        }catch(error){
            return [false, error.code];
        }
    }else{
        updateDoc(userDataRef, updatingData); //here no any response from server, so try/catch is not needed
        return [true];
    }; 
}

//makeOrder
let makeUserOrder = async (userData, basketData, totalSum) => {
    let userDataRef = doc(db, "users", userData.personalID);
    let newOrderItems = basketData.map( book => {
        return (
            {
                id: book.id, 
                img: book.img, 
                amount: book.amount,
            }
        )
    });
    let newOrder = {
        items: newOrderItems,
        "totalSum": totalSum,
        orderDate: getCurrentData(),
    }
    let updatedOrders = [ ...userData.orders.completed, newOrder ];

    updateDoc(userDataRef, {
        orders: {
            completed: updatedOrders,
            returned: [],
        },
    });
}

export { recheckBasketData, 
        getBooksBySearch, 
        sortByPrice, 
        getReviewBook, 
        getSelection, 
        userRegistration, 
        login, 
        logOut, 
        updateUserData,
        makeUserOrder,
        checkIsAppAccessible,
    };
