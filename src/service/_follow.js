import axios from "axios";
import { proxy } from "../const/proxy";
import { getTokenFromLocal } from "../lib/LocalStore";



const getFollowNcc = async (ctv,req)=>{
    const rs = await axios.get(`${proxy}/api/v1/follow/ctv/${ctv}?p=${req.p}&size=${req.size}`);
    return rs;
}

const getFollowCtv = async (ncc,req)=>{
    const rs = await axios.get(`${proxy}/api/v1/follow/ncc/${ncc}?p=${req.p}&size=${req.size}&idpro=${req.idpro}&namectv=${req.namectv}`);
    return rs;
}

const follow = async (ncc)=>{
    const token = getTokenFromLocal()||"";
    const rs = await axios.post(`${proxy}/api/v1/follow?idncc=${ncc}`,null,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    return rs;
}

const unFollow = async (id)=>{
    const rs = await axios.delete(`${proxy}/api/v1/follow/${id}`);
    return rs;
}
const unFollowWithNccAndCtv = async (ncc,ctv)=>{
    const rs = await axios.delete(`${proxy}/api/v1/follow/unfollow/${ncc}?ctv=${ctv}`);
    return rs;
}

export {
    getFollowNcc,
    getFollowCtv,
    follow,
    unFollow,
    unFollowWithNccAndCtv
}