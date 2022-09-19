let hideUserProfile = (userProfilePanel, veil) => {
    userProfilePanel && userProfilePanel.removeAttribute("style");
    window.document.body.removeAttribute("style");
    veil.removeAttribute("style");   
}

let showUserProfule = (userProfilePanel, veil) => {
    window.document.body.style.overflow = "hidden";
    veil.style.display = "block";
    userProfilePanel.style.cssText = "transform: translate(-50%, -50%) scale(1)";
}

let displayUserProfile = () => {
    let veil = document.querySelector("#veil");
    let userProfilePanel = document.querySelector("#userProfilePanel");

    return {
        showUserProfule: () => showUserProfule(userProfilePanel, veil),
        hideUserProfile: () => hideUserProfile(userProfilePanel, veil),
    }
}

export default displayUserProfile;