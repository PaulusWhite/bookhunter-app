let displaySpinner = (flag) => {
    let spinner = document.querySelector("#spinner");
    if(!spinner) return; //for first condition in catalog.jsx
    
    flag ? spinner.style.display = "block" : spinner.style.display = "none";
}

export default displaySpinner;