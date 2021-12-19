const timeStampToStringFormat = (time)=>{
    if (time==null) {
        time=new Date().getTime();
    }
    const date = new Date(time);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}
const timeToString = (time)=>{
    if (time==null) {
        time=new Date().getTime();
    }
    const date = new Date(time);

    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export {
    timeStampToStringFormat,
    timeToString
}