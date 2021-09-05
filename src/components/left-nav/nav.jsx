import React,{Component} from "react"
import {Link} from "react-router-dom"
import "./nav.less"
import logo from "../../assets/img/manage.png"
import menuList from "../../config/menuConfig"
import { Menu, Icon, Button } from 'antd';
const {SubMenu} = Menu
class Nav extends Component{
    // 利用数组数据动态生成导航结构
    getMenuNodes = (menu) => {
        return menu.map(item => {
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return(
                    <SubMenu
                    key={item.key}
                    title={
                      <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                      </span>
                    }
                  >
                      {this.getMenuNodes(item.children)}
                  </SubMenu>
                )
            }
        })
    }
    render(){
        return(
            <div>
                <Link to="/" className="nav-header">
                    <img className="header-img" src={logo} alt=""/>
                    <h1>后台管理</h1>
                </Link>
                <Menu 
                mode="inline"
                theme="dark">
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
                
            </div>
        )
    }
}

export default Nav