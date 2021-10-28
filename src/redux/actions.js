/*
存放 action 函数的模块
*/
import { INCREMENT, DECREMENT } from "./action-types";

export const increment = (num) => ({type:INCREMENT,value:num})

export const decrement = (num) => ({type:DECREMENT,value:num})
