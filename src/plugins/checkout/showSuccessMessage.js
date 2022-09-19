let showSuccessMessage = (sucessBlock) => {
    sucessBlock.style.display = "block";
    setTimeout( () => {
        sucessBlock.style.opacity = 1;
    }, 100);
}

export default showSuccessMessage;