import React,{Component} from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import ProductHome from "./productHome"
import ProductAdd from "./productAdd"
import ProductUpdate from "./productUpdate"

class Product extends Component{
    render(){
        return(
            <Switch>
                {/* exact表示路由精确定位，只有路由完全相等才会匹配，不会逐层匹配 */}
                <Route path="/product" component={ProductHome} exact></Route>
                <Route path="/product/add" component={ProductAdd}></Route>
                <Route path="/product/update" component={ProductUpdate}></Route>
                {/* 重定向，拼接其他参数也会匹配到首页 */}
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}
export default Product