/*
这是redux 的容器组件，负责连接react 和 redux
*/

import React from "react";  //引入react
import Redux from "../pages/redux-test/redux"       //引入视图组件
import {increment, decrement} from "./actions"           //引入需要触发的 action 函数
import { connect } from "react-redux";           //引入connect函数


/*
 *连接 react   和   redux
 */ 
export default connect(
    state => ({count: state.test}),       //这里传递视图组件需要的props
    {
        increment: (num) => dispatch(increment(num)),
        decrement: (num) => dispatch(decrement(num))
    }
)(Redux)