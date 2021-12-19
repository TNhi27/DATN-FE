import axios from "axios"
import { getTokenFromLocal } from "../lib/LocalStore";
import {proxy as p} from "../const/proxy"

const proxy = `${p}/api/v1/ncc`;

const getTopNcc=async ()=>{
    const rs = await axios.get(`${proxy}/top`);
    return rs;
}
const getListNcc=async ()=>{
    const rs = await axios.get(`${proxy}/list`);
    return rs;
}
const getProductsByNcc = async (ncc)=>{
    const rs = await axios.get(`${proxy}/products?idncc=${ncc}`);
    return rs;
}

const getNccByProduct= async(idpro)=>{
    const rs = await axios.get(`${proxy}/get_ncc_by_product?idpro=${idpro}`);
    
    return rs;
}

const getNccById =async (id,size)=>{
    const rs = await axios.get(`${proxy}/get_ncc_by_id?id=${id}&size=${size}`);
    
    return rs;
}

const getDetailsCtv =async (id)=>{
    const rs = await axios.get(`${proxy}/details_ctv/${id}`);
    
    return rs;
}

const selectProductsWithNcc = async (ncc,fil)=>{
    const rs = await axios.get(`${proxy}/productsv2`,{
        params:{
            idncc:ncc,
            pageNumber:fil.page,
            size:fil.size,
            category:fil.category,
            name:fil.name
        }
    })

    return rs;
}

const setShopId = async (code) => {
    const token = getTokenFromLocal()||"";
    const rs = await axios.post(`${proxy}/dangkishop`,null,{
        headers:{
            "Authorization":`Bearer ${token}`
        },
        params:{
            code:code
        }
    });
    
    return rs;
}

const getNccDTO=async(id)=>{
    const rs = await axios.get(`${proxy}/getdto/${id}`);
    
    return rs;
}

const updateNccByDTO =async (username,dto) =>{
    const token = getTokenFromLocal()||"";
    const rs = await axios.put(`${proxy}/${username}`,dto,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    
    return rs;
}


export {
    getTopNcc,
    getProductsByNcc,
    getNccByProduct,
    getNccById,
   selectProductsWithNcc,
   setShopId,
   getDetailsCtv,
   getNccDTO,updateNccByDTO,
   getListNcc
}