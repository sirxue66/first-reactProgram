/*
存放 action 函数的模块
*/

import { INCREMENT, DECREMENT } from "./action-types"   
export function increment(num){
    return {type:INCREMENT,value:num}
}
export const decrement = (num) => ({type:DECREMENT,value:num})