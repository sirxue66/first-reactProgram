import { combineReducers } from "redux";
import storageUtils from "../utils/storageUtils"
import { SET_HEADER_TILE, RECIVE_USER } from "./action-types";
import store from "store";
/*
    头部标题状态管理的reducer
*/
const initTitle = store.get("header-title") || "首页";
function headerTitle(state = initTitle,action){
    switch (action.type) {
        case SET_HEADER_TILE:
            return action.value;
        default:
            return state
    }
}

// 用户信息管理
const initUSer = storageUtils.getUser() || {}
function user(state = initUSer, action) {
    switch (action.type) {   
        case RECIVE_USER:
            return action.value;
        default:
            return state;
    }
}

export default combineReducers({
    headerTitle,
    user
})