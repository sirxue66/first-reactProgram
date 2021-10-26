import React,{ Component } from "react";
import "./header.less"
import { getWeather,newGetWeather } from "../../api";
import {formateDate} from "../../utils/handleDate"
import {Button,Modal} from "antd"
import userMessage from "../../utils/userMessage";
import {withRouter} from "react-router-dom"
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils"; 
import LinkButton from "../common/linkButton"

class Headers extends Component{
    state = {
        currentTime:formateDate(new Date()),
        weatherImg:require("../../assets/img/sunny.png"),
        dayPictureUrl:"",
        weather:""    // 天气情况
    }
    getcurrentTime = () => {
        let _this = this;
        this.intervalTime = setInterval(() => {
            _this.setState({
                currentTime:formateDate(new Date())
            })
        },1000);
    }
    getWeathers = async() => {
        // const {dayPictureUrl,weather} = await getWeather("北京");
        // this.setState({dayPictureUrl,weather});
        const {weather,hello} = await newGetWeather("北京");
        this.setState({
            weather:weather,
            dayPictureUrl:hello
        })
    }
    // 获取当前路由的title名
    getCurrentTitle = () => {
        let path = this.props.location.pathname;
        let currentPath;
        menuList.forEach(item => {
            if(item.key === path){
                currentPath = item.title;
            } else if(item.children){
                item.children.forEach(citem => {
                    if(citem.key === path){
                        currentPath = citem.title;
                    }
                })
            }
        })
        return currentPath
    }
    logOut = () => {
        Modal.confirm({
            content:"确定退出吗？",
            onOk:() => {
                // 清空storage内存
                storageUtils.removeUser();
                userMessage.user = {};
                this.props.history.replace("/login");
            },
            onCancel:()=>{
                console.log("取消");
            }
        })
    }

    componentDidMount(){
        this.getcurrentTime();
        this.getWeathers();
    }
    // renser() 函数中调用方法，如果加了()表示函数会一直执行，所以点击等事件不能加()
    render(){
        const username = userMessage.user.username;
        const {currentTime,dayPictureUrl,weather,weatherImg} = this.state;
        const title = this.getCurrentTitle();
        // 验证react渲染机制，基本就是1秒渲染一次
        // const t = formateDate(Date.now())
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎 {username}</span>&nbsp;&nbsp;&nbsp;
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                    {/* <span className="logOut" onClick={this.logOut}>退出</span> */}
                </div>
                <div className="header-bottom">
                    <p className="p-title">{title}</p>
                    <div>
                        <span>{dayPictureUrl}</span>
                        <span>{currentTime}</span>
                        <img src={weatherImg} alt="天气icon" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Headers)