import axios from "axios";
import { proxy } from "../const/proxy";

const login = async (username,password)=>{
    const rs = await axios.post(`${proxy}/login`,"",{
        params:{
            username:username,
            password:password
        }
    });

    return rs;
}

export {
    login
}