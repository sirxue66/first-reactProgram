import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers.js"
import thunk from "redux-thunk";

export default createStore(reducer, applyMiddleware(thunk))   //创建store的时候就会调用一次reducer，来获取state的初始值