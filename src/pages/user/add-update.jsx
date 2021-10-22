import React, {Component} from "react";
import {Form, Input, Select} from "antd"
import PropTypes from "prop-types"
const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        user: PropTypes.object,
        roles: PropTypes.array.isRequired
    }

    validatorPassWord = (rule,value,callback) => {
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if(!value){
            callback("请输入密码");
        }else if (length < 4) {
            callback('密码必须大于 4 位')
        } else if (length > 12) {
            callback('密码必须小于 12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback() // 必须调用 callback
        }
    }
    validatorPhone = (rule,value,callback) => {
        const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if(!value){
            callback("请输入手机号");
        } else if(!phoneReg.test(value)){
            callback("手机号不正确");
        } else {
            callback();
        }
    }
    validatorEmail = (rule,value,callback) => {
        const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!value){
            callback("请输入邮箱");
        } else if(!emailReg.test(value)){
            callback("邮箱不正确");
        } else {
            callback();
        }
    }

    componentDidMount(){
        this.props.setForm(this.props.form);    //通过setForm将本组件form属性传递出去
    }

    render(){
        let {user, roles} = this.props
        let { getFieldDecorator } = this.props.form

        const formateForm = {
            labelCol:{span:4},
            wrapperCol:{span:20}
        }
        return(
            <Form {...formateForm}>
                <Item label="用户名">
                    {
                        getFieldDecorator("username",{
                            initialValue:user.username,
                            rules:[      //whitespace检查是否有空格
                                {isRequired:true,whitespace:true,message:"用户名不能为空"},
                                {min:3,message:"用户名不可小于3位"},
                                {max:10,message:"用户名不可大于10位"}
                            ]
                        })(
                            <Input placeholder="请输入用户名"></Input>
                        )
                    }
                </Item>
                {
                    !user._id ? (
                        <Item label="密码">
                            {
                                getFieldDecorator("password",{
                                    rules:[
                                        {validator:this.validatorPassWord}
                                    ]
                                })(
                                    <Input placeholder="请输入密码"></Input>
                                )
                            }
                        </Item>
                    ) : null
                }
                <Item label="手机号">
                    {
                        getFieldDecorator("phone",{
                            initialValue:user.phone
                        })(
                            <Input placeholder="请输入手机号"></Input>
                        )
                    }
                </Item>
                <Item label="邮箱">
                    {
                        getFieldDecorator("email",{
                            initialValue:user.email
                        })(
                            <Input placeholder="请输入邮箱"></Input>
                        )
                    }
                </Item>
                <Item label="角色">
                    {
                        getFieldDecorator("role_id",{
                            initialValue:user.role_id
                        })(
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default AddUpdate = Form.create()(AddUpdate)