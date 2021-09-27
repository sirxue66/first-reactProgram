import React,{Component} from "react"
import {Card,Table,Select,Button,Icon} from "antd"
const Option = Select.Option
const Item = Table.Item

class ProductHome extends Component{
    render(){
        const title = (
            <span>
                <Select>
                    <Option>11</Option>
                    <Option>22</Option>
                </Select>
                <Input placeholder="请输入关键字"></Input>
                <Button>
                    <Icon type="search"></Icon>
                    搜索
                </Button>
            </span>
        )
        
        const addArea = (
            <Button>
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        return(
            <Card title={title} extra={addArea}>

            </Card>
        )
    }
}
export default ProductHome