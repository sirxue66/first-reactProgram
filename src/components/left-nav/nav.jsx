import React,{Component} from "react"
import {Link,withRouter} from "react-router-dom"
import "./nav.less"
import logo from "../../assets/img/manage.png"
import menuList from "../../config/menuConfig"
import { Menu, Icon } from 'antd';
import userMessage from "../../utils/userMessage"

import { connect } from "react-redux"
import { setHeaderTitle } from "../../redux/actions"
import PropType from "prop-types"
const {SubMenu} = Menu
class Nav extends Component{

    // 声明props，简单的话可以不声明，直接使用
    static propType = {
        setHeaderTitle: PropType.func.isRequired 
    }
    // 利用数组数据动态生成导航结构  map+递归
    getMenuNodes_map = (menu) => {
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
    // 利用数组数据动态生成导航结构  reduce+递归
    getMenuNodes = (menu) => {
        return menu.reduce((pre,item) => {
            // 权限校验通过的item可执行生成导航树
            if(this.hasAuth(item)){
                if(!item.children){
                    pre.push(
                        (
                            <Menu.Item key={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
                            <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                            </Link>
                            </Menu.Item>
                        )
                    )
                } else {
                    // 解决子菜单选中，不展开的问题
                    const path = this.props.location.pathname;
                    if(item.children.find(citem => path.indexOf(citem.key) === 0)){
                        this.openkey = item.key;
                        // console.log(this.openkey);
                        // console.log(path);
                    }
                    pre.push(
                        (
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
                    )
                }   
            }
            return pre;
        },[])
    }

    //进行权限处理
    // 公共组件都可以看到
    // admin用户拥有所有权限
    // 对路由表的路径进行处理，符合条件的生成导航树
    hasAuth = (menuItem) => {
        // console.log("当前user",userMessage);
        let menus = userMessage.user.role.menus;
        if(menuItem.isPublic || userMessage.user.username === "admin"){
            return true;
        } else if(menus.indexOf(menuItem.key) !== -1){       //数组使用indexOf时，必须与数组某一项完全相等时才会匹配到
            return true;
        } else if(menuItem.children){
            let children = menuItem.children.find(item => menus.indexOf(item.key) !== -1)
            if(children){
                return true
            }
        } else {
            return false;
        }

    }

    // 为了保证渲染之前获取到openkey，渲染之前需要走一遍函数，才能遍历出openkey的值
    componentWillMount(){
        this.navNodes = this.getMenuNodes(menuList);
    }
    render(){
        let path = this.props.location.pathname;
        let openkey = this.openkey;
        // console.log(path);
        if(path.indexOf("/product/") !== -1){
            path = "/product"
        }
        return(
            <div>
                <Link to="/" className="nav-header">
                    <img className="header-img" src={logo} alt=""/>
                    <h1>后台管理</h1>
                </Link>
                <Menu 
                mode="inline"
                theme="dark"
                selectedKeys={[path]}     //选中的导航栏
                defaultOpenKeys={[openkey]}     //默认打开的导航栏
                >
                    {
                        // this.getMenuNodes(menuList)
                        this.navNodes
                    }
                </Menu>
                
            </div>
        )
    }
}
// withRouter 将一个非路由组件包装成一个新的组件，从而获得路由组件的功能
export default connect(
    state => ({}),
    {setHeaderTitle}
)(withRouter(Nav))