import React, {Component} from "react";
import {Form,Input} from "antd"
import PropTypes from "prop-types"
let {Item} = Form

class AddRole extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.setForm(this.props.form);
    }
    render(){ 
        let {getFieldDecorator} = this.props.form
        return(
            <Form>
                <Item label="角色名称">
                    {
                        getFieldDecorator("roleName",{
                            initialValue:""
                        })(
                            <Input placeholder="请输入角色名"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default AddRole = Form.create()(AddRole)