import axios from "axios"
import {proxy} from "../const/proxy"

const proxy_child = `${proxy}/api/v1/category`

const getAllCategory = async () => {
    const rs = await axios.get(`${proxy_child}`);
    return rs;
}

const getCategoryList=async ()=>{
    const rs = await axios.get(`${proxy_child}/get_parent`);
    return rs;
}

const getCategoryById=async(id)=>{
    const rs = await axios.get(`${proxy_child}/getone/${id}`);
    return rs;
}

export {
    getAllCategory,
    getCategoryList,
    getCategoryById
}