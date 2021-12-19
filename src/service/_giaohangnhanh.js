import axios from "axios"
import { id, token } from "../const/giaohangnhanh"

const getProvince = async () => {
    const rs = await axios.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province", {
        headers: {
            token: token
        }
    })
    return rs;
}

const getDistrict = async (tinh) => {
    const rs = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${tinh}`, {
        headers: {
            token: token
        }
    })
    return rs;
}

const getWard = async (district_id) => {
    const rs = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`, {
        headers: {
            Token: token
        }
    })
    return rs;
}

//don hang

const createOrderOfGhn = async (order,idshop) => {
    const rs = await axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create`, order, {
        headers: {
            Token: token,
            ShopId: idshop
        }
    })
    console.log(rs);
    return rs;
}



const DangKiShop = async (req) => {
    const rs = await axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/register`, req, {
        headers: {
            Token: token

        }
    })
    return rs;
}

const getStatusOrderGHN=async(code)=>{
    const rs = await axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail`, code, {
        headers: {
            Token: token

        }
    })
    return rs;
}

export {
    getDistrict,
    getProvince,
    getWard,
    createOrderOfGhn,

   
    DangKiShop,
    getStatusOrderGHN
}