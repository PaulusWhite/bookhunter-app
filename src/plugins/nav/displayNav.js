let hideNav = (nav, closeNavBtn) => {
    nav.removeAttribute("style");
    closeNavBtn.removeAttribute("style");  
    document.body.removeAttribute("style");
}

let displayNav = () => {
    let nav = document.querySelector("#nav");
    let burgerMenu = document.querySelector("#burgerMenu");
    let closeNavBtn = document.querySelector("#closeNavBtn");
    hideNav(nav, closeNavBtn);

    burgerMenu.addEventListener("click", () => {
        nav.style.left = 0;
        closeNavBtn.style.display = "block";
        document.body.style.overflow = "hidden";
    });

    closeNavBtn.addEventListener("click", () => {
        hideNav(nav, closeNavBtn);
    });
}

export default displayNav;