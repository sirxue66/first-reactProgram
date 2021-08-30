import React,{Component} from "react"
import "./login.less"
import logo from "../../assets/img/loginIoc.jpg"
import{Form,Input,Button} from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const Item = Form.Item
class Login extends Component{
    validator = (value,callback) => {
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
    login =(e) => {
        e.preventDefault();
        
    }

    render(){
        const { getFieldDecorator } = this.props.form
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React:后台管理项目</h1>
                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            {
                                getFieldDecorator(
                                    "username",{
                                        rules:[
                                            {required:true,whitespace:true,message:"请输入用户名"},
                                            {min:3,message:"用户名不能小于3位"},
                                            {max:10,message:"用户名不能大于10位"},
                                            {pattern:/^[a-zA-Z0-9_]+$/,message:"用户名必须由英文、数组或下划线组成"}
                                        ]
                                    }
                                )(
                                    <Input placeholder="请输入用户名" className="login-form-button"
                                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}></Input>
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator(
                                    "password",{
                                        rules:[
                                            {validator:this.validator}
                                        ]
                                    }
                                )(
                                    <Input placeholder="请输入密码" className="login-form-button"
                                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                                    type="password"></Input>
                                )
                            }
                        </Item>
                        <Item>
                            <Button htmlType="submit" className="login-form-button" type="primary">登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin