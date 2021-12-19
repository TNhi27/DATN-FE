import axios from "axios"
import { proxy } from "../const/proxy";

import { getTokenFromLocal } from "../lib/LocalStore";

const proxy_chid = `${proxy}/api/v1/order`;


const getOrdersWithCtv = async (ctv, filter) => {
    const rs = await axios.get(`${proxy_chid}/ctv/${ctv}?status=${filter.status}&id=${filter.id}`);
    return rs;
}

const getOrdersWithNcc = async (ncc, filter) => {
    const rs = await axios.get(`${proxy_chid}/ncc/${ncc}?status=${filter.status}&id=${filter.id}`);
    return rs;
}

const getOrder = async (id) => {
    const rs = await axios.get(`${proxy_chid}/get/${id}`);
    return rs;
}

const createOrders = async (order) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy_chid}`, order, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}

const removeOrder = async (id) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy_chid}/cancel/${id}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return rs;
}
const removeOrderNcc = async (id,rson) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy_chid}/cancelncc/${id}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params:{
            lydo:rson
        }
    })
    return rs;
}

const getReportByDay = async (d, m, y) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy}/api/v1/report_ctv?d=${d}&m=${m}&y=${y}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return rs;
}

const getDoanhThuThang = async (ctv, m, y) => {
    const rs = await axios.get(`${proxy}/api/v1/report_ctv/doanh_thu?m=${m}&y=${y}&ctv=${ctv}`);
    return rs;
}

const getReportByDayNcc = async (d, m, y) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy}/api/v1/report_ncc?d=${d}&m=${m}&y=${y}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return rs;
}

const getDoanhThuThangNcc = async (ncc, m, y) => {
    const rs = await axios.get(`${proxy}/api/v1/report_ctv/doanh_thu?m=${m}&y=${y}&ncc=${ncc}`);
    return rs;
}

const updateOrderCode = async (orderid, code, total_fee) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy_chid}/update_ghn_code`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params: {
            id: orderid,
            code: code,
            total_fee:total_fee
        }
    })
    return rs;
}

const updateStatusOrder = async (id, status) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy_chid}/update_status`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params: {
            id: id,
            status: status
        }
    })
    return rs;
}

const payToCtv = async (id) => {
    const token = getTokenFromLocal() || "";
    const rs = await axios.post(`${proxy_chid}/pay_to_ctv`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params: {
            id: id

        }
    })
    return rs;
}

export {
    getOrdersWithCtv,
    getOrdersWithNcc,
    getOrder,
    createOrders,
    removeOrder,
    removeOrderNcc,
    getReportByDay,
    getDoanhThuThang,

    getReportByDayNcc,
    getDoanhThuThangNcc,

    updateOrderCode,
    updateStatusOrder,
    payToCtv
}

