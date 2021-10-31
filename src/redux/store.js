import { createStore,applyMiddleware } from "redux";
import Reducer from "./reducers"
import thunk from "redux-thunk";

const store = createStore(Reducer, applyMiddleware(thunk))   //创建store， 使用thunk异步中间件

export default store
