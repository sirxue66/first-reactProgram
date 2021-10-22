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