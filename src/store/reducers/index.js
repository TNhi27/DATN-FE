import {combineReducers} from 'redux'
import loginReducers from './_loginReducers'
import searchReducers from './_searchReducers'

export default combineReducers({
    login: loginReducers,
    search:searchReducers
})