import React,{Component} from "react"
import {Form,Input} from "antd"
// 使用prop-types进行类型检验，避免错误，类TypeScripts
import propTypes from "prop-types"
const Item = Form.Item

class UpdateForm extends Component{
    static propTypes={
        categoryName:propTypes.string.isRequired,
        setForm:propTypes.func.isRequired
    }
    componentDidMount(){
        this.props.setForm(this.props.form);
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {categoryName} = this.props
        return(
            <Form>
                <Item label="品类名称">
                    {
                        getFieldDecorator("categoryName",{
                            initialValue:categoryName,
                            rules:[
                                {required:true,whitespace:true,message:"请输入品类名称！"}
                            ]
                        })(
                            <Input placeholder="请输入品类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)