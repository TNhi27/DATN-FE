import axios from "axios";
import { getTokenFromLocal } from "../lib/LocalStore";
import {proxy as p} from "../const/proxy"


const proxy = `${p}/api/v1/regi_products`;


const regiProduct = async (regi) => {
    const token = getTokenFromLocal()||"";
    const rs = await axios.post(proxy,regi,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    
    return rs;
}

const getRegiProduct= async(ctv,filter)=>{
    const rs = await axios.get(`${proxy}/ctv/${ctv}?category=${filter.category}&name=${filter.name}`);
    return rs;
}

const deleteRegiProduct=async(id)=>{
    const rs = await axios.delete(`${proxy}/${id}`);
    return rs;
}

const getNccOfCtv=async(ctv)=>{
    const rs = await axios.get(`${proxy}/get_ncc/${ctv}`);
    return rs;
}

const getRegiProductOfNccAndCtv=async(ncc,ctv)=>{
    const rs = await axios.get(`${proxy}/get_product/${ncc}/${ctv}`);
    return rs;
}

export {
    regiProduct,
    getRegiProduct,
    deleteRegiProduct,
    getNccOfCtv,
    getRegiProductOfNccAndCtv
}