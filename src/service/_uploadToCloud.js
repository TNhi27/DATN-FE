import axios from "axios"

const uploadAvatar=async(file)=>{
    const form = new FormData();
    form.append("file",file);
    form.append("upload_preset","duan_2021");
    form.append("folder","avatar");
    const rs = await axios.post(`https://api.cloudinary.com/v1_1/duan2021/image/upload`,form);
    return rs;
}

const uploadImageProducts = async(files)=>{
   
    const form = new FormData();
    form.append("file",files);
    form.append("upload_preset","duan_2021");
    form.append("folder","image_products");
    const rs = await axios.post(`https://api.cloudinary.com/v1_1/duan2021/image/upload`,form);
    return rs;
}

export {
    uploadAvatar,
    uploadImageProducts
}