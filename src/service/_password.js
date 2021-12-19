import axios from "axios"
import { getTokenFromLocal } from "../lib/LocalStore";
import {proxy} from "../const/proxy"


const changePw =async (obj)=>{
    const token = getTokenFromLocal()||"";
    const rs = await axios.post(`${proxy}/password/change`,null,{
        headers:{
            "Authorization":`Bearer ${token}`
        },
        params:{
            password:obj.password,
            newP:obj.newP,
            confirmP:obj.confirmP
        }
    })

    return rs;
}

export{
    changePw
}