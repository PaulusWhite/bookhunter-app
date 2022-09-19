let taglinesContent = {
    slide1: {
        preliminarysLogan: "Choose any book you like !",
        topTagline: "a good book is",
        bottomTagline: "endless",
    },
    slide2: {
        preliminarysLogan: "Find your favorite writer !",
        topTagline: "reading will make you",
        bottomTagline: "happier",
    },
    slide3: {
        preliminarysLogan: "Broaden your outlook !",
        topTagline: "today a reader",
        bottomTagline: "but tomorrow a leader",
    },
}

let changeTaglinesContent = (taglinesBlock, nextSlide) => {
    let preliminarysLogan = taglinesBlock.firstElementChild;
    let topTagline = taglinesBlock.children[1].firstElementChild;
    let bottomTagline = taglinesBlock.children[1].lastElementChild;
    let slideMarker = nextSlide.dataset.alt;

    if(slideMarker === "slide1"){
        preliminarysLogan.textContent = taglinesContent.slide1.preliminarysLogan;
        topTagline.textContent = taglinesContent.slide1.topTagline;
        bottomTagline.textContent = taglinesContent.slide1.bottomTagline;
    }else if (slideMarker === "slide2"){
        preliminarysLogan.textContent = taglinesContent.slide2.preliminarysLogan;
        topTagline.textContent = taglinesContent.slide2.topTagline;
        bottomTagline.textContent = taglinesContent.slide2.bottomTagline;
    }else{
        preliminarysLogan.textContent = taglinesContent.slide3.preliminarysLogan;
        topTagline.textContent = taglinesContent.slide3.topTagline;
        bottomTagline.textContent = taglinesContent.slide3.bottomTagline;
    }
    taglinesBlock.style.cssText = "opacity:1; top:50%;"
}

let changeTaglines = (taglinesBlock, nextSlide) => {
    taglinesBlock.removeAttribute("style");
    setTimeout( () => {
        changeTaglinesContent(taglinesBlock, nextSlide);
    }, 1300);
}

let toggleAnimationClass = (slideLine, animationClass, flag) => {
    [].forEach.call(slideLine.children, slide => {
        flag ? slide.classList.add(animationClass) : slide.classList.remove(animationClass);
    });
}

let toggleOffsetSlide = (slideLine, flag) => {
    [].forEach.call(slideLine.children, slide => {
        flag ? slide.style.right = "100%" : slide.style.right = "0";
    });
}

let swipeRight = (slideLine, animationClass, taglinesBlock) => {
    let activeSlide = document.querySelector(`.${slideLine.className} .activeSlide`);
    let lastSlide = document.querySelector(`.${slideLine.className} .lastSlide`);
    let nextSlide = activeSlide.nextElementSibling;

    changeTaglines(taglinesBlock, nextSlide);

    toggleAnimationClass(slideLine, animationClass, true);
    toggleOffsetSlide(slideLine, true);

    setTimeout( () => {
        slideLine.appendChild(activeSlide);

        toggleAnimationClass(slideLine, animationClass, false);
        toggleOffsetSlide(slideLine, false);

        activeSlide.classList.remove("activeSlide");
        nextSlide.classList.add("activeSlide");
        lastSlide.classList.remove("lastSlide");
        slideLine.lastElementChild.classList.add("lastSlide");
    }, 1300); // 1300 is duration of offset animation from scss module.it must be equal to duration from scss one
}

let swipeLeft = (slideLine, animationClass, taglinesBlock) => {
    let activeSlide = document.querySelector(`.${slideLine.className} .activeSlide`);
    let lastSlide = document.querySelector(`.${slideLine.className} .lastSlide`);

    changeTaglines(taglinesBlock, lastSlide);

    slideLine.prepend(lastSlide);
    toggleOffsetSlide(slideLine, true);

    new Promise( () =>{
        setTimeout( () => {
            toggleAnimationClass(slideLine, animationClass, true);
            toggleOffsetSlide(slideLine, false);
        }, 0);
    }).then( setTimeout( () => {
        toggleAnimationClass(slideLine, animationClass, false);
        activeSlide.classList.remove("activeSlide");
        lastSlide.classList.add("activeSlide");
        lastSlide.classList.remove("lastSlide");
        slideLine.lastElementChild.classList.add("lastSlide");
    }, 1300)); // 1300 is duration of offset animation from scss module.it must be equal to duration from scss one
}

let disableArrows = (arrowRight, arrowLeft) => {
    arrowRight.style.pointerEvents = "none";
    arrowLeft.style.pointerEvents = "none";
    setTimeout( () => {
        arrowRight.removeAttribute("style");
        arrowLeft.removeAttribute("style");
    }, 1300); // 1300 is duration of offset animation from scss module.it must be equal to duration from scss one
}

let caroosel = (slideLine, animationClass, direction, arrowRight, arrowLeft, taglinesBlock) => {
    if(direction === "right"){
        disableArrows(arrowRight, arrowLeft);
        swipeRight(slideLine, animationClass, taglinesBlock);
    }else if(direction === "left"){
        disableArrows(arrowRight, arrowLeft);
        swipeLeft(slideLine, animationClass, taglinesBlock);
    }else{
        swipeRight(slideLine, animationClass, taglinesBlock);
    }
}

export default caroosel;