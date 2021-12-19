import {LOGIN,LOGOUT, SEARCH} from "../../const/redux_const";

const doLogin = (user)=>{
    return({
        type:LOGIN,
        payload:user
    })
}

const doLogout = ()=>{
    return({
        type:LOGOUT
    })
}

const doSearch = (query)=>{
    return({
        type:SEARCH,
        payload:query
    })
}

export {
    doLogin,
    doLogout,
    doSearch
}