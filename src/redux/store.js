import { createStore } from "redux";
import reducer from "./reducers"

export default createStore(reducer)   //创建store的时候就会调用一次reducer，来获取state的初始值