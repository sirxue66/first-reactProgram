import React,{Component} from 'react'
// BrowserRouter 路径没有#  HashRouter 路径有#
import {BrowserRouter,Switch,Route} from "react-router-dom"

import Register from './pages/register/register'
import Login from './pages/login/login'
import Main from './pages/main/main'
class App extends Component{

    // 完整的生命周期
        // constructor(){}
        // componentWillMount(){}
        // render(){}
        // componentDidMount(){}
        // componentWillReceiveProps(){}
        // shouldComponentUpdate(){}
        // componentWillUpdate(){}
        // render(){}
        // componentDidUpdate(){}
        // componentWillUnmount(){}
    // setState() 更新状态是异步还是同步？
        // 在react相关回调函数中是 异步执行的  ，例如：生命周期函数，绑定的事件函数等
        // 在非react回调函数是   同步执行的    ，例如：定时器函数，原生事件回调函数，Promise回调函数中
        // 、、连续调用多个setState()，使用对象的模式 ，更新state和视图render都会合并，也就是说只会更新一次
        // 、、连续调用多个setState()，使用函数的模式，更新视图会合并，但是更新state值不会合并，会执行多次setState()函数
        // 对象模式     setState({name: name1})
        // 函数模式     setState(state => ({state.name: name1}))
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Main}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
 
export default App