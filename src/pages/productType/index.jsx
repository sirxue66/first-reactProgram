import React,{Component} from "react"
import "./index.less"
import {Card,Table,Icon,Message,Model} from "antd"
import LinkButton from "../../components/common/linkButton"
import {getCategorys,addCategorys,updateCategory} from "../../api/index"
class ProductType extends Component{
    state = {
        oneCategorys:[],
        twoCategorys:[],
        parentId:"0",
        parentName:"",
        isLoading:false,
        showType:0
    }
    // 获取列表数据
    getDatas = async(parentId) => {
        this.setState({
            isLoading:true
        });
        parentId = parentId || this.state.parentId;
        const result = await getCategorys(parentId);
        this.setState({
            isLoading:false
        });
        if(result.status === 0){
            const categorys = result.data;
            if(parentId === "0"){
                this.setState({
                    oneCategorys:categorys
                });
            } else {
                this.setState({
                    twoCategorys:categorys
                })
            }
        }else{
            Message.error("获取数据失败，请重试！")
        }
    }

    // 查看子列表数据
    getSubDatas = (category) => {
        this.setState({
            parentId:category._id,
            parentName:category.name
        },() => {
            // console.log(this.state.parentId)
            this.getDatas();
        }
        );
    }
    gotoOneList = () => {
        this.setState({
            parentId:"0",
            twoCategorys:[]
        })
    }

    componentDidMount(){
        this.getDatas();
    }

    componentWillMount(){
        this.columns= [
            { title: '分类名称', dataIndex: 'name', },
            { title: '操作', width:200, render:(category)=>{
                return(
                    <span>
                         <LinkButton>修改品类</LinkButton>&nbsp;&nbsp;&nbsp;
                        {this.state.parentId === "0" ? <LinkButton onClick={()=>{this.getSubDatas(category)}}>查看</LinkButton> : null}
                    </span>
                   
                )
            }}
        ]
    }
    render(){
        const {oneCategorys,twoCategorys,parentId,parentName,isLoading} = this.state
        const title = parentId === "0" ? "品类列表" : (
            <span>
                <LinkButton onClick={this.gotoOneList}>品类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight:"5px"}}></Icon>
                {parentName}
            </span>
        )
        const addArea = (
            <LinkButton>
            <Icon type="plus"></Icon>
            添加
            </LinkButton>
        )
        return(
            <Card title={title} extra={addArea} >
                <Table
                bordered
                rowKey="_id"
                loading={isLoading}
                dataSource={parentId === "0" ? oneCategorys : twoCategorys}
                columns={this.columns}
                pagination={{pageSize: 8, showQuickJumper: true, showSizeChanger: true}}
                ></Table>
            </Card>
        )
    }
}
export default ProductType