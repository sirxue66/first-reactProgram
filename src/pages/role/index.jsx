import React,{Component} from "react"
import {Card, Table, Button, message, Modal} from "antd"
import {addRole,roleList,updateRole} from "../../api/index"
import { ROLE_PAGE_SIZE } from "../../utils/variableGlobal"
import {formateDate} from "../../utils/handleDate"
import AddRole from "./add-role"
import UpdateRole from "./update-role"

class Role extends Component{
    state = {
        roles:[],
        role:{},
        showAdd:false,
        showUpdate:false,
        isLoading:true,    //表格的loading
    }

    initColumns = () => {
        this.columns = [
            {
                title:"角色名称",
                dataIndex:"name"
            },
            {
                title:"创建时间",
                dataIndex:"create_time",
                render: (create_time) => formateDate(create_time)
            },
            {
                title:"授权时间",
                dataIndex:"auth_time",
                render: (auth_time) => formateDate(auth_time)
            },
            {
                title:"授权人",
                dataIndex:"auth_name"
            }
        ]
    }
    getRoles = async() => {
        const results = await roleList();
        console.log("权限数据",results);
        this.setState({
            isLoading:false
        });
        if(results.status === 0){
            let roles = results.data;
            this.setState({
                roles
            });
        } else {
            message.error("获取权限数据失败！");
        }
    }
    onRow = (role) => {
        return {
            onClick: event => {
                console.log("选择的数据",role);
                this.setState({
                    role:role
                });
            }
        }
    }
    //新增角色
    addRole = () => {
        this.form.validateFields(async(err,value) => {
            // console.log("新增数据",value);
            if(!err){
                let {roleName} = value;
                let results = await addRole(roleName);
                if(results.status === 0){
                    message.success("角色添加成功!");
                    // 关闭弹窗  清空数据
                    this.setState({
                        showAdd:false
                    });
                    this.form.resetFields();
                    // 不请求，添加数据
                    // console.log("添加的数据",results);
                    let resultData = results.data;
                        // let rolesDate = [...this.state.roles]
                        // rolesDate.push(resultData);
                        // this.setState({
                        //     roles:rolesDate
                        // });
                    // 优化的推荐的添加数据的方法
                    this.setState(state => ({
                        roles:[...state.roles, resultData]
                    }));
                }
            } else {
                message.error("请校验角色是否正确！");
            }
        })
    }
    // 更改权限
    updateRole = () => {

    }
    closeModal = () => {
        this.setState({
            showAdd:false,
            showUpdate:false
        });
    }

    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        this.getRoles();
    }

    render(){
        const {roles, role, isLoading, showAdd, showUpdate} = this.state

        const title = (
            <span>
                <Button type="primary" onClick={() => {this.setState({showAdd:true})}}>新建角色</Button>
                <Button type="primary" onClick={() => {this.setState({showUpdate:true})}} disabled={role._id ? false : true} style={{marginLeft:"10px"}}>更改权限</Button>
            </span>
        )   
        
        return(
            <Card title={title}>
               <Table
                bordered
                rowKey="_id"
                dataSource={roles}   //绑定的数据源
                columns={this.columns}    //数据列的数据
                loading={isLoading}
                pagination={{pageSize:ROLE_PAGE_SIZE}}
                rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}    //单选，自动选中role中的_id
                onRow={this.onRow}
                ></Table>

                {/* 添加角色 */}
                <Modal
                title="新增角色"
                visible={showAdd}
                onOk={this.addRole}
                onCancel={this.closeModal}
                okText="新增"
                cancelText="取消"
                >
                    <AddRole setForm={(form) => {this.form = form}}></AddRole>
                </Modal>

                 {/* 更改权限 */}
                 <Modal
                title="更改权限"
                visible={showUpdate}
                onOk={this.updateRole}
                onCancel={this.closeModal}
                okText="确定"
                cancelText="取消"
                >
                    
                </Modal>
            </Card>
        )
    }
}
export default Role