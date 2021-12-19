import axios from "axios";
import { proxy } from "../const/proxy";
import { getTokenFromLocal } from "../lib/LocalStore";


const doComment= async(cmt)=>{
    const token = getTokenFromLocal()|| ""
    const rs =await axios.post(`${proxy}/api/v1/comments`,cmt,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })

    return rs;
}

export {
    doComment
}