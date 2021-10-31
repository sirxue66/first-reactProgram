// actions函数
import { SET_HEADER_TILE, RECIVE_USER } from "./action-types"
import store from "store"
import {login} from "../api/index"

// 设置title的action函数
export const setHeaderTitle = (title) => {
    store.set("header-title",title);
    return {type: SET_HEADER_TILE, value: title}
}

// 登录成功，用于接受用户信息的同步action
export const reciveUser = (user) => ({type: RECIVE_USER, value: user});

/*
    登录的异步action函数
*/ 
export const loginAsync = (username,password) => {
    return async(dispatch) => {
        // 发送ajax异步请求
        let results = await login(username,password);

        // 触发失败或者成功的同步action
        if(results.status === 0){
            let userMsg = results.date;
            dispatch(reciveUser(userMsg));
        } else {
            let mess = results.msg;
        }
    }
}

