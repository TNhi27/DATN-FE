const saveTokenToLocal = (token)=>{
    window.localStorage.setItem("token",token);
}
const getTokenFromLocal = ()=>{
    const token = window.localStorage.getItem("token");
    return token;
}

export {
    saveTokenToLocal,
    getTokenFromLocal
}