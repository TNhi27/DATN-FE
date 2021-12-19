import { SEARCH } from "../../const/redux_const";

const query={
    name:'',
    category:'%%'
}

const searchReducers = (state = query, action) => {
    switch (action.type) {
        case SEARCH:
            console.log(action);
            state = action.payload
            return state;
        
        default:
            return state;
    }
}

export default searchReducers;