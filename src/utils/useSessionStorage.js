let setPreviewData = (previewData, previewTitle) => {
    sessionStorage.setItem(previewTitle, JSON.stringify(previewData));
}

let checkLocalPreviewData = (previewTitle) => {
    return JSON.parse(sessionStorage.getItem(previewTitle));
}


let checkIsAccessDenied = () => {
    let isAccessDenied = JSON.parse(sessionStorage.getItem("accessDenied"));
    return isAccessDenied;
}

let setAccessDenied = () => {
    sessionStorage.setItem("accessDenied", true);
}

export { setPreviewData, checkLocalPreviewData, checkIsAccessDenied, setAccessDenied };