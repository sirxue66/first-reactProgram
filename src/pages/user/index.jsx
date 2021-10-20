import React,{Component} from "react"
import {Card,Button,Table} from "antd"
import {ROLE_PAGE_SIZE} from "../../utils/variableGlobal"
import {formateDate} from "../../utils/handleDate"
import LinkButton from "../../components/common/linkButton"
class User extends Component{
    state = {
        userList:[],
        isLoading: false
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
                dataIndex:"role_id"
            },
            {
                title:"操作",
                render: () => (
                    <span>
                        <LinkButton>修改</LinkButton>&nbsp;&nbsp;&nbsp;
                        <LinkButton>删除</LinkButton>
                    </span>
                )
            }
        ]
        return columns;
    }

    componentWillMount(){
        this.columns = this.initColumns();
    }
    render(){
        const title = (
            <Button type="primary">添加用户</Button>
        )
        let {userList, isLoading} = this.state
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
            </Card>
        )
    }
}
export default User