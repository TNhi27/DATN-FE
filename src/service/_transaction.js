import axios from "axios";
import { getTokenFromLocal } from "../lib/LocalStore";
import {proxy as p} from "../const/proxy"

const proxy = `${p}/api/v1/transaction`;

const getTransaction=async(filter)=>{
    const token = getTokenFromLocal()||"";
    const rs = await axios.post(`${proxy}/get`,null,{
        headers:{
            "Authorization":`Bearer ${token}`
        },
        params:{
            type:filter.type,
            page:filter.page,
            size:filter.size
        }
    })

    return rs;
}

const createTransaction=async(tran)=>{
    const token = getTokenFromLocal()||"";
    const rs = await axios.post(`${proxy}/create`,null,{
        headers:{
            "Authorization":`Bearer ${token}`
        },
        params:{
            value:tran.value,
            type:tran.type,
            paypal:tran.idpaypal
        } 
      
    })

    return rs;
}




export{
    getTransaction,
    createTransaction
}

