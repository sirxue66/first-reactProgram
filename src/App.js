import React,{Component} from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"

import Register from './pages/register/register'
import Login from './pages/login/login'
import Main from './pages/main/main'
class App extends Component{
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