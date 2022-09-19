//get Book Data for View on Preview page or Review page

let replaceDescription = (description) => {
    let newDescription = description;
    let regexp = /<[^<>]+>/g;
    let deletedTags = description && description.match(regexp);

    deletedTags && deletedTags.forEach( tag => {
        let newStr = newDescription.replace(tag, " ");
        newDescription = newStr;
    });

    !newDescription && (newDescription = "There is no description");

    return newDescription;
}

let setCategories = (categoriesArr) => {
    let arr = [];

    categoriesArr.forEach( category => {
        if(arr.length < 2) arr.push(category);
    });

    return arr.join(", ");
}

let getCommonData = (bookObj) => {
    let id = bookObj.id;
    let authors = bookObj.volumeInfo.authors && bookObj.volumeInfo.authors.join(", ");
    let title = bookObj.volumeInfo.title;
    let img = bookObj.volumeInfo.imageLinks && bookObj.volumeInfo.imageLinks.thumbnail;
    img = img && img.replace("zoom=1&", "zoom=1&w=480&");

    //get price
    let priceInfo = bookObj.saleInfo && bookObj.saleInfo.retailPrice;
    let priceAmount = (priceInfo && priceInfo.amount !== 0) ? priceInfo.amount : "4.88";
    let priceCurrencyCode = priceInfo ? priceInfo.currencyCode : "USD";
    let price = `${priceAmount} ${priceCurrencyCode}`;
    let currency = priceInfo ? priceInfo.currencyCode : "USD";   

    return {
        id,
        title,
        authors,
        img,
        price,
        amount: 1,
        currency,
    }
}

let getPreviewDataBook = (item) => {
    let previewDataBook = getCommonData(item);
    return { ...previewDataBook}
}

let getReviewDataBook = (item) => {
    let commonData = getCommonData(item);
    let description = replaceDescription(item.volumeInfo.description);
    
    let pageCount = item.volumeInfo.pageCount;
    let categories = item.volumeInfo.categories && setCategories(item.volumeInfo.categories);
    let publisher = item.volumeInfo.publisher;
    let published = item.volumeInfo.publishedDate;
    let ISBN = item.volumeInfo.industryIdentifiers && item.volumeInfo.industryIdentifiers[0].identifier;

    return [
        {
            ...commonData,
            pageCount,
            categories,
            publisher,
            published,
            ISBN
        },
        {
            description,
        }
    ];
}

export { getPreviewDataBook, getReviewDataBook, replaceDescription };