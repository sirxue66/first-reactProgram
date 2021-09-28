import React,{Component} from "react"
import {Card,Table,Select,Button,Icon,Input} from "antd"
import { Link,withRouter } from "react-router-dom"
import LinkButton from "../../components/common/linkButton"
import { PAGE_SIZE } from "../../utils/variableGlobal"
import {productsList,getListByIdOrName,changeProductStatus} from "../../api/index"
const Option = Select.Option

class ProductHome extends Component{
    state={
        isLoading:false,
        productsList:[],
        total:0,   //总数
        searchKey:"",  //搜索关键子
        searchType:"productName"    //搜索类型  productName/productDesc
     }
     getProductList = async(pageNum) => {
         this.currentPage = pageNum;     //将当前页数保存到this中，供后续使用
         this.setState({
             isLoading:true
         });
         const result = await productsList(pageNum,PAGE_SIZE);
         this.setState({
             isLoading:false
         });
         if(result.status === 0){
             const {total,list} = result.data
            this.setState({
                total:total,
                productsList:list
            })
         }
     }

     updateStatus = async(productId,status) => {
        const result = await changeProductStatus(productId,status);
        if(result.status === 0){
            this.getProductList(this.currentPage);
        }
     }

     toDetail = (product) => {
        this.props.history.replace("/product/detail",product);
     }
     toAdd = (product) => {
        this.props.history.replace("/product/add",product);
     }

     initColumns = () => {
        this.columns = [
            {
                title:"商品名称",
                dataIndex:"name"
            },
            {
                title:"商品描述",
                dataIndex:"desc"
            },
            {
                title:"商品价格",
                dataIndex:"price",
                render: (price) => <span style={{color:"green"}}>￥{price}</span>
            },
            {
                title:"状态",
                width:"100px",
                dataIndex:"status",
                render: (status,product) => {   //1 在售   2 下架
                    let statusText = "在售";
                    let btnText = "下架";
                    if(status === 2){
                        btnText = "上架";
                        statusText = "已下架"
                    }
                    return(
                        <span>
                            <Button type="primary" onClick = {
                                () => {
                                    status = status === 1 ? 2 : 1;
                                    this.updateStatus(product._id,status);
                                }
                            }>{btnText}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{statusText}</span>
                        </span>
                    )
                }
            },
            {
                title:"操作",
                width:"150px",
                render: (product) => {
                    return(
                        <span>
                            <LinkButton onClick={() => this.toDetail(product)}>详情</LinkButton>
                            <LinkButton onClick={() => this.toAdd(product)}>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
     }

    componentWillMount(){
        //初始化columns数据
        this.initColumns();
    }
    componentDidMount(){
        this.getProductList(1);
    }
    render(){
        const {productsList,isLoading,total} = this.state


        const title = (
            <span>
                <Select style={{width:"150px",marginRight:"10px"}}>
                    <Option value="0">11</Option>
                    <Option value="0">22</Option>
                </Select>
                <Input style={{width:"150px",marginRight:"10px"}} placeholder="请输入关键字"></Input>
                <Button type="primary">
                    <Icon type="search"></Icon>
                    搜索
                </Button>
            </span>
        )
        
        const addArea = (
                <Button type="primary" onClick={() => this.toAdd()}>
                    <Icon type="plus"></Icon>
                    添加
                </Button>
        )
        return(
            <Card title={title} extra={addArea}>
                <Table
                bordered
                dataSource={productsList}
                columns={this.columns}
                loading={isLoading}
                pagination={{pageSize:PAGE_SIZE,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    total:total,
                    onChange:(pageNum) => this.getProductList(pageNum)
                }}
                ></Table>
            </Card>
        )
    }
}
export default withRouter(ProductHome)