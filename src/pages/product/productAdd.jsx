import React,{Component} from "react"
import { withRouter } from "react-router"
import {Card,Icon} from "antd"
import LinkButton from "../../components/common/linkButton"

class ProductAdd extends Component{
    render(){
        const title = (
            <span>
                <Icon type="arrow-left"></Icon>
                <LinkButton onClick={() => this.props.history.replace("/product")}>返回</LinkButton>
            </span>
        )
        const extra = (
            <span>添加/修改</span>
        )
        
        return(
            <Card title={title} extra={extra}>

            </Card>
        )
    }
}
export default withRouter(ProductAdd) 