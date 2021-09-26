import React,{Component} from "react"
import "./index.less"
import {Card,Table,Icon,Message,Model, Modal} from "antd"
import LinkButton from "../../components/common/linkButton"
import AddForm from "./addForm"
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
    showAdd = () => {
        this.setState({
            showType:1
        });
    }
    showUpdate = () => {
        this.setState({
            showType:2
        });
    }
    // 关闭弹窗
    closeModal = () => {
        this.setState({
            showType:0
        });
    }
    // 添加品类
    addProducts = async() => {
        const {parentId,categoryName} = this.props.form
        const resule = await addCategorys({parentId,categoryName});
        if(result.code === "0"){
            this.state({
                showType:0
            });
            this.form.resetFilds();
            if(parentId === "0"){
                this.getDatas();
            } else {
                this.getSubDatas();
            }
        }
    }
    // 修改品类
    updateProduct = () => {

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
                         <LinkButton onClick={this.showUpdate}>修改品类</LinkButton>&nbsp;&nbsp;&nbsp;
                        {this.state.parentId === "0" ? <LinkButton onClick={()=>{this.getSubDatas(category)}}>查看</LinkButton> : null}
                    </span>
                   
                )
            }}
        ]
    }
    render(){
        const {oneCategorys,twoCategorys,parentId,parentName,isLoading,showType} = this.state
        const title = parentId === "0" ? "品类列表" : (
            <span>
                <LinkButton onClick={this.gotoOneList}>品类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight:"5px"}}></Icon>
                {parentName}
            </span>
        )
        const addArea = (
            <LinkButton onClick={this.showAdd}>
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

                {/* 添加品类 */}
                <Modal
                title="添加品类"
                visible={showType === 1}
                onOk={this.addProducts}
                onCancel={this.closeModal}
                okText="添加"
                cancelText="取消"
                >
                    <AddForm
                    categorys:category
                    parentId:parentId
                    setForm={form => this.form = form}   //将子组件传过来的参数赋值到this上的form
                    ></AddForm>
                </Modal>
                {/* 修改品类 */}
                <Modal
                title="修改品类名称"
                visible={showType === 2}
                onOk={this.updateProduct}
                onCancel={this.closeModal}
                okText="确定"
                cancelText="取消"
                >
                    <h1>修改品类名称</h1>
                </Modal>
            </Card>
        )
    }
}
export default ProductType