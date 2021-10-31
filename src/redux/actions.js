/*
存放 action 函数的模块
*/
import { INCREMENT, DECREMENT } from "./action-types";

export const increment = (num) => ({type:INCREMENT,value:num})

export const decrement = (num) => ({type:DECREMENT,value:num})
// 增加的异步 action函数
export const incrementAsync = (num) => {
    // 返回一个函数
    return dispatch => {
        setTimeout(() => {
            // 函数内部执行异步操作，最后触发一个同步的action
            dispatch(increment(num));
        },2000)
    }
}