let replaceValue = (value) => {
    let valueLength = value.toString().length;
    valueLength === 1 && (value = "0" + value);
    
    return value;
}

let getCurrentData = () => {
    let cuurentDate = new Date();
    let day = replaceValue( cuurentDate.getDate() );
    let month = replaceValue( cuurentDate.getMonth() );
    let year = cuurentDate.getFullYear();

    return `${day} ${month} ${year}`;
}

export default getCurrentData;