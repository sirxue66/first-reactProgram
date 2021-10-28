/*
这是redux 的容器组件，负责连接react 和 redux
*/
import React from "react"
import { connect } from "react-redux"          //引入connect函数
import TestReduct from "../pages/redux-test/redux"       //引入视图组件
import { increment, decrement } from "../redux/actions"         //引入需要触发的 action 函数



/*
 *连接 react   和   redux
 */ 
const mapStateToProps = (state) => {
    console.log("store状态值---------",state);
    return ({count: state})
}
mapStateToProps();
const mapDispatchToProps = (dispatch) => ({
    increment: (num) => dispatch(increment(num)),
    decrement: (num) => dispatch(decrement(num))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestReduct)