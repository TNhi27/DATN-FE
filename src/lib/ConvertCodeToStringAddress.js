import { getProvince } from "../service/_giaohangnhanh"


const convertToTinh = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.ProvinceID === id) {
            return element.ProvinceName;
        }
    }
    return "";
}

const convertToHuyen = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.DistrictID === id) {
            return element.DistrictName;
        }
    }
    return "";
}
const convertToXa = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.WardCode == id) {
            return element.WardName;
        }
    }
    return "";
}

export {
    convertToTinh,
    convertToHuyen,
    convertToXa
}