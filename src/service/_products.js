import axios from "axios"
import { getTokenFromLocal } from "../lib/LocalStore";
import {proxy as p} from "../const/proxy"

const proxy = `${p}/api/v1/products`;

const getTopRatingProducts = async () => {
    const rs = await axios.get(`${proxy}/top_star`)
    return rs;
}
const getNewProducts = async (size) => {
    const rs = await axios.get(`${proxy}/new?num=${size}`);
    return rs;
}
const getProductsById = async (id) => {

    const rs = await axios.get(`${proxy}/getone/${id}`);
    return rs;
}

const getCommentsOfProducts = async (id, page, size) => {
    const rs = await axios.get(`${proxy}/comments?idpro=${id}&page=${page}&size=${size}`);
    return rs;
}
const getProductsWithCategory = async (category) => {
    const rs = await axios.get(`${proxy}/get_by_category?category=${category}`);
    return rs;
}

const getProductsList = async (fil) => {
   

    const rs = await axios.get(`${proxy}?parent=${fil.parent}&q=${fil.query}&p=${fil.page}&size=${fil.size}&sort=${fil.sort}&category=${fil.category}&min_price=${fil.min}&max_price=${fil.max}&origin=${fil.origin}&city=${fil.city}&des=${fil.des}`);
    return rs;
}

const getOrigins = async () => {
    const rs = await axios.get(`${proxy}/origins`);
    return rs;
}
const getCityNcc = async () => {
    const rs = await axios.get(`${proxy}/city_ncc`);
    return rs;
}


//ncc

const saveProducts = async (pro) => {
    const token = getTokenFromLocal() || ""
    const rs = await axios.post(`${proxy}`, pro, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}
const updateProducts = async (id,pro) => {
    const token = getTokenFromLocal() || ""
    const rs = await axios.put(`${proxy}/${id}`, pro, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}


const deleteProducts = async (id) => {
    const token = getTokenFromLocal() || ""
    const rs = await axios.delete(`${proxy}/${id}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}


export {
    getTopRatingProducts,
    getNewProducts,
    getProductsById,
    getCommentsOfProducts,
    getProductsWithCategory,
    getProductsList,
    getCityNcc,
    getOrigins,

    saveProducts,
    deleteProducts,
    updateProducts,
    
}