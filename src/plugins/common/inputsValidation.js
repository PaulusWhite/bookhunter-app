//display error Message if input value is not correct
let showErrorMessage = (input, addedClass) => {
    let group = input.parentElement;
    if(group.classList.length > 1) return;

    group.classList.add(addedClass);
    setTimeout( () => {
        group.classList.remove(addedClass);
    }, 3000);
}

//Inputs validations
let nickNameValidation = (input, errorMessageClass) => {
    let nickNameRe = /[A-za-z]/;
    if(!nickNameRe.test(input.value) || input.value.length < 6 || input.value.length > 16){
        showErrorMessage(input, errorMessageClass);
        return 0;
    }
    return 1;
}

let passwordValidation = (input, errorMessageClass) => {
    if(input.value.length < 8 || input.value.length > 45){
        showErrorMessage(input, errorMessageClass);
        return 0;
    }
    return 1;
}

let repeatPasswordValidation = (input, prevInput, errorMessageClass) => {
    if(input.value !== prevInput.value){
        showErrorMessage(input, errorMessageClass);
        return 0;
    }
    return 1;
}

let emailValidation = (input, errorMessageClass) => {
    let emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if(!emailRe.test(input.value)){
        showErrorMessage(input, errorMessageClass);
        return 0;
    }
    return 1;
}

export { nickNameValidation, passwordValidation, repeatPasswordValidation, emailValidation, showErrorMessage }