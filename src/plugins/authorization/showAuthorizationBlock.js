let showAuthorizationBlock = (authorizationBlock, addedClass, hideBtn, setFlag) => {
    let signUpBtn = document.querySelector("#signUp");
    let signIn = document.querySelector("#signIn");

    signUpBtn.addEventListener("click", () => {
        authorizationBlock.classList.add(addedClass);
        document.body.style.overflow = "hidden";
        setFlag(false);
    });

    signIn.addEventListener("click", () => {
        authorizationBlock.classList.add(addedClass);
        document.body.style.overflow = "hidden";
        setFlag(true);
    });
    
    hideBtn.addEventListener("click", () => {
        authorizationBlock.classList.remove(addedClass);
        document.body.removeAttribute("style");
    });
}

export default showAuthorizationBlock;