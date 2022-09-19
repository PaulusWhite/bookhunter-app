let getBasketData = () => {
    let basketArr = JSON.parse(localStorage.getItem("basket"));
    return basketArr ? basketArr : [];
}

let getBasketTotalPrice = () => {
    let basketArr = getBasketData();
    let result = 0;
    let currency = basketArr[0] && basketArr[0].currency;

    basketArr.forEach( item => {
        let totalPrice = item.amount * parseFloat(item.price);
        result += totalPrice;
    });

    return result.toFixed(2) + " " + currency;
}

let setBookIdForBasket = (bookData) => {
    !localStorage.getItem("basket") && localStorage.setItem("basket", JSON.stringify([]));
    let bookId = bookData.id;
    let basketArr = getBasketData();

    let result = basketArr.every( basketBook => {
        return basketBook.id !== bookId && true;
    });

    result && basketArr.push(bookData);
    localStorage.setItem("basket", JSON.stringify(basketArr));
}

let changeAmountBasketBook = (id, newAmount) => {
    let basketArr = getBasketData();

    basketArr.forEach( book => {
        book.id === id && (book.amount = newAmount);
    });

    localStorage.setItem("basket", JSON.stringify(basketArr));
}

let removeBasketBook = (id) => {
    let basketArr = getBasketData();

    basketArr.forEach( (book, index) => {
        book.id === id && basketArr.splice(index, 1);
    });
    
    localStorage.setItem("basket", JSON.stringify(basketArr));
}

let isBookInBasket = (bookId) => {
    let basketArr = getBasketData();

    let result = basketArr.every( basketBook => {
        return basketBook.id !== bookId && true;
    });

    return !result ? true : false;
}

let clearBasketData = () => {
    localStorage.setItem("basket", JSON.stringify([]));
}

export {
    setBookIdForBasket, 
    getBasketData, 
    changeAmountBasketBook, 
    removeBasketBook, 
    isBookInBasket, 
    getBasketTotalPrice,
    clearBasketData
};