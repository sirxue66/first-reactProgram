import React,{Component} from "react"
import { Redirect } from "react-router"
import userMessage from "../../utils/userMessage"
import { Layout } from "antd"
import LeftNav from "../../components/left-nav/nav"
import Headers from "../../components/header/header"
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "../home/index"
import ProductType from "../productType/index"
import Product from "../product/index"
import User from "../user/index"
import Role from "../role/index"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"
const {Header,Footer,Sider,Content} = Layout
export default class Main extends Component{

    render(){
        const user = userMessage.user;
        if(!user._id){
            return (
                <Redirect to="/login"></Redirect>
            )
        }
        return(
            <Layout style={{height:"100%"}}>
                <Sider style={{backgroundColor: "rgb(71 71 72)"}}>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header style={{backgroundColor: "white"}}>
                        <Headers></Headers>
                    </Header>
                    <Content style={{backgroundColor: "#b0b1b000",padding:"30px"}}>
                       
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/productType" component={ProductType}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                            </Switch>
                        
                    </Content>
                    <Footer style={{backgroundColor: "rgb(221 222 221)",textAlign:"center",color:"gray"}}>
                        推荐使用谷歌浏览器打开来达到最佳效果!
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}