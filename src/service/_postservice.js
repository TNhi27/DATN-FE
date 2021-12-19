import axios from "axios"
import { getTokenFromLocal } from "../lib/LocalStore";
import {proxy as p} from "../const/proxy"

const proxy = `${p}/api/v1/post`;


const getPostList=async(fil)=>{
    const rs = await axios.get(`${proxy}/search?page=${fil.page}&size=${fil.size}&title=${fil.title}`);
    return rs;
 }
const getPostById =async (id)=>{
    const rs = await axios.get(`${proxy}/get/${id}`);
    return rs;
}

export {
    getPostList,
    getPostById
}