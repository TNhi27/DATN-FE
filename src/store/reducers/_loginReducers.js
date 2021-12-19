import { LOGIN, LOGOUT } from "../../const/redux_const";

const localUser = {
    username: "",
    role: "",
    jwt: "",
    image:""
}

const loginReducers = (state = localUser, action) => {
    switch (action.type) {
        case LOGIN:
            state = action.payload
            return state;
        case LOGOUT:
            state = {
                username: "",
                role: "",
                jwt: "",
                image:""
            }
            return state;
        default:
            return state;
    }
}

export default loginReducers;