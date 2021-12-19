import axios from "axios";
import { getTokenFromLocal } from "../lib/LocalStore";

import { proxy } from '../const/proxy'


const getAccountCtv = async () => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy}/api/v1/ctv/info`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}
const getAccountNcc = async () => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy}/api/v1/ncc/info`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}

const updateAccountCtv = async (ctv) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy}/api/v1/ctv/update`, ctv, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}


export{
    getAccountCtv,
    updateAccountCtv,
    getAccountNcc
}