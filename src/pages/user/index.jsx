import React,{Component} from "react"
import {Card,Button,Table,Modal, message} from "antd"
import {ROLE_PAGE_SIZE} from "../../utils/variableGlobal"
import {formateDate} from "../../utils/handleDate"
import LinkButton from "../../components/common/linkButton"
import {getUserList, deleteUser, addOrUpdateUser, roleList} from "../../api/index"
import AddUpdate from "./add-update"
class User extends Component{
    state = {
        userList:[],
        rolesList:[],
        isLoading: true,
        modalTitle: "添加用户",
        showModal: false
    }

    handleRoleName = (roleId) => {
        let rolesList = this.state.rolesList;
        let roleName;
        rolesList.forEach(item => {
            if(item._id === roleId){
                roleName = item.name;
            }
        })
        return roleName
    }
    initColumns = () => {
        let columns = [
            {
                title:"用户名",
                dataIndex:"username"
            },
            {
                title:"邮箱",
                dataIndex:"email"
            },
            {
                title:"电话",
                dataIndex:"phone"
            },
            {
                title:"注册时间",
                dataIndex:"create_time",
                render: (create_time) => formateDate(create_time)
            },
            {
                title:"所属角色",
                dataIndex:"role_id",
                render: (role_id) => this.handleRoleName(role_id)
            },
            {
                title:"操作",
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.updateUser(user)}>修改</LinkButton>&nbsp;&nbsp;&nbsp;
                        <LinkButton onClick={() => {this.deleteUser(user)}}>删除</LinkButton>
                    </span>
                )
            }
        ]
        return columns;
    }
    getUserList = async() => {
        let results = await getUserList();
        this.setState({
            isLoading: false
        });
        if(results.status === 0){
            // console.log("用户数据",results)
            this.setState({
                userList: results.data.users,
                rolesList: results.data.roles
            });
        }
    }
    deleteUser = async(user) => {
        Modal.confirm({
            content: `确定删除用户${user.name}吗？`,
            onOk: async() => {
                let userId = user._id;
                let results = await deleteUser(userId);
                if(results.status === 0){
                    message.success("用户删除成功！");
                    this.getUserList();
                } else {
                    message.error("删除用户失败，请稍后重试！");
                }
            }
        })
        
    }
    updateUser = (user) => {
        this.setState({
            showModal:true,
            modalTitle:"修改信息"
        });
        this.user = user;
        // console.log("当前用户",this.user);
    }
    isOk = async() => {
        let user = this.mForm.getFieldsValue();
        console.log("收集的用户信息",user);
        // 判断是更新操作
        if(this.user){
            user._id = this.user._id;
        };
        let results = await addOrUpdateUser(user);
        if(results.status === 0){
            message.success(this.user ? "信息修改成功！" : "用户添加成功！");
            this.setState({showModal: false});
            this.getUserList();
        } else {
            message.error("添加用户失败，请稍后重试！");
        }
        this.mForm.resetFields();      //清空表单数据
    }
    isCancel = () => {
        this.setState({
            showModal: false
        });
        this.mForm.resetFields();
    }
    addUser = () => {
        this.setState({
            showModal: true,
            modalTitle: "添加用户"
        });
    }


    componentWillMount(){
        this.columns = this.initColumns();
    }
    componentDidMount(){
        this.getUserList();
    }
    render(){
        const title = (
            <Button type="primary" onClick={this.addUser}>添加用户</Button>
        )
        let {userList, isLoading, modalTitle, rolesList, showModal} = this.state
        let user = this.user || {}
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey="_id"
                dataSource={userList}
                columns={this.columns}
                loading={isLoading}
                pagination={{pageSize:ROLE_PAGE_SIZE,
                    showQuickJumper:true,
                    showSizeChanger:true
                }}
                ></Table>
                <Modal 
                title= {modalTitle}
                visible={showModal}
                onOk={this.isOk}
                onCancel={this.isCancel}
                okText="确定"
                cancelText="取消"
                >
                    <AddUpdate roles={rolesList} user={user} setForm={form => this.mForm = form}></AddUpdate>
                </Modal>
            </Card>
        )
    }
}
export default User