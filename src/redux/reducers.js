/*
根据旧的state和 action 返回新的state
*/
import {combineReducers} from "redux"
import {INCREMENT, DECREMENT} from "./action-types"

function test(state=0,action){
    console.log(state);
    switch (action.type){
        case INCREMENT:
            return state + action.value;
        case DECREMENT:
            return state - action.value;
        default:
            return state 
    }
}
function test01(state=1,action){
    return state;
}

export default combineReducers({
    test,
    test01
})