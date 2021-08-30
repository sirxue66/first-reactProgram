/*
根据state和action返回新的state
*/
import {combineReducers} from "redux"

function test(state=0,action){
    return state;
}
function test01(state=1,action){
    return state;
}

export default combineReducers({
    test,
    test01
})