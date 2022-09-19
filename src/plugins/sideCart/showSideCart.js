let hideSideCart = (sideCart, addedClass, veil) => {
    sideCart.classList.remove(addedClass);
    window.document.body.style.overflow = "auto";
    veil.removeAttribute("style");   
}

let showSideCart = (sideCart, addedClass, hideBtn, toCartBtn) => {
    let basketBtn = document.querySelector("#basket");
    let veil = document.querySelector("#veil");

    basketBtn.addEventListener("click", () => {
        sideCart.classList.add(addedClass);
        window.document.body.style.overflow = "hidden";
        veil.style.display = "block";
    });

    veil.addEventListener("click", () => {
        if(sideCart.classList.contains(addedClass)){
            hideSideCart(sideCart, addedClass, veil);
        }
    });

    hideBtn.addEventListener("click", () => {
        hideSideCart(sideCart, addedClass, veil);
    });
    
    toCartBtn.addEventListener("click", () => {
        hideSideCart(sideCart, addedClass, veil);
    });
}

export default showSideCart;