import axios from "axios"
import {proxy} from "../const/proxy"
import { getTokenFromLocal } from "../lib/LocalStore";

const getInfoBanks =async(username)=>{
    const rs =await axios.get(`${proxy}/api/v1/infobank/get/${username}`);
    return rs;
}

const createInfoBanks =async(info)=>{
    const token = getTokenFromLocal()||"";
    const rs =await axios.post(`${proxy}/api/v1/infobank`,null,{
        headers:{
            "Authorization":`Bearer ${token}`
        },
        params:{
            name:info.name,
           
            bank:info.bankname,
            num:info.banknumber
        }
    });
    return rs;
}

export {
    getInfoBanks,
    createInfoBanks
}