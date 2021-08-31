import React,{Component} from "react"
import { Redirect } from "react-router"
import userMessage from "../../utils/userMessage"
import { Layout } from "antd"
import LeftNav from "../../components/left-nav/nav"
import Header from "../../components/header/header"
export default class Main extends Component{

    render(){
        const user = userMessage.user;
        if(!user._id){
            return (
                <Redirect to="/login"></Redirect>
            )
        }
        return(
            <div>Main</div>
        )
    }
}