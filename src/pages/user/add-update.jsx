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
                            initialValue:user.username
                        })(
                            <Input placeholder="请输入用户名"></Input>
                        )
                    }
                </Item>
                {
                    !user._id ? (
                        <Item label="密码">
                            {
                                getFieldDecorator("password",{})(
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