import React,{Component} from "react"
import {Form,Select,Input} from "antd"
// 使用prop-types进行类型检验，避免错误，类TypeScripts
import propTypes from "prop-types"
const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
    static propTypes = {
        categroys:propTypes.array.isRequired,
        parentId:propTypes.string.isRequired,
        setForm:propTypes.func.isRequired   //子组件调用函数向父组件传值
    }

    componentWillMounted(){
        // 将子组件表数据form对象通过函数形式传给父组件
        this.props.setForm(this.props.form);
    }
    render() {
        const {getFiledDecorator} = this.props.form
        const {categroys,parentId} = this.props
        return(
            <Form>
                <Item label="所属品类">
                    {
                        getFiledDecorator("parentId",
                            {initialValue:parentId}
                        )(
                            <Stlect>
                                <Option key="0" value="0">一级分类</Option>
                                {
                                    categroys.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)    
                                }
                            </Stlect>
                        )
                    }
                </Item>
                <Item label="品类名称">
                    {
                        getFiledDecorator("categoryName",{
                            initialValue:"",
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

export default Form.create(AddForm) 