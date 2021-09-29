import React,{Component} from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import ProductHome from "./productHome"
import ProductAdd from "./productAdd"
import ProductDetail from "./productDetail"
// 子路由、子标签的样式也可以写在这一个less中
import "./index.less"

class Product extends Component{
    render(){
        return(
            <Switch>
                {/* exact表示路由精确定位，只有路由完全相等才会匹配，不会逐层匹配 */}
                <Route path="/product" exact component={ProductHome}></Route>
                <Route path="/product/add" component={ProductAdd}></Route>
                <Route path="/product/detail" component={ProductDetail}></Route>
                {/* 重定向，拼接其他参数也会匹配到首页 */}
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}
export default Product