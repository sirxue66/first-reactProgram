/*
根据旧的state和 action 返回新的state
*/
import { combineReducers } from "redux";
import { INCREMENT, DECREMENT } from "./action-types";

const reducer = (state = 0,action) => {
    switch(action.type){
        case INCREMENT:
            return state + action.value;
        case DECREMENT:
            return state - action.value;
        default:
            return state;
    }
}
export default reducer