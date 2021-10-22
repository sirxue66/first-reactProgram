import React, {Component} from "react";
import {Form,Input,List,Tree} from "antd"
import PropTypes from "prop-types"
import menuList from "../../config/menuConfig"
let {Item} = Form
let {TreeNode} = Tree

class UpdateRole extends Component {
    static propTypes = {
        role:PropTypes.object
    }

    constructor(props){
        super(props)
        let {menus} = this.props.role
        this.state = {
            checkedKey:menus
        }
    }
    // 生成权限树
    getTreeNodes = (menuList) => {
        return menuList.reduce((endList,item) => {
            endList.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return endList;
        },[])   //[] 是初始值
    }


    // 选中某个 node 时的回调
    onCheck = (checkedKeys) => {   //勾选获取勾选的树 数据
        console.log("勾选权限",checkedKeys);
        this.setState({
            checkedKey:checkedKeys
        });
    }

    getMenuToFather = () => this.state.checkedKey;

    componentWillMount(){
        this.TreeNodes = this.getTreeNodes(menuList);
    }

    // 当组件接收新的数据时调用，一个生命周期
    componentWillReceiveProps(nextProps){
        let newMenu = nextProps.role.menu;
        this.setState({       //选择新的角色时更新现有权限树
            checkedKey:newMenu
        });
    }
    
    render(){ 
        let { role } = this.props
        let { checkedKey } = this.state

        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:12}
        }
        return(
            <Form {...formItemLayout}>
                <Item label="角色名称">
                    <Input value={role.name} disabled></Input>
                </Item>
                <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKey}
                onCheck={this.onCheck}
                >
                    <TreeNode title="权限树" key="all">
                        {this.TreeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
export default UpdateRole