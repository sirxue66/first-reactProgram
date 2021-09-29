import React,{Component} from "react"
import { withRouter } from "react-router"
import {Card,Icon,List,message} from "antd"
import {getTypeById} from "../../api/index"
import { IMG_BASE_URL } from "../../utils/variableGlobal"
import LinkButton from "../../components/common/linkButton"
const Item = List.Item

class productDetail extends Component{
    state={
        typeOne:"",   //一级分类名称
        typeTwo:""    //二级分类名称
    }
    // 获取分类名称
    getTypeName = async() => {
        let {categoryId,pCategoryId} = this.productDetail  //获取传参过来的两个分类id
        // 如果一级分类，只显示一级分类
        if(pCategoryId === "0"){
            let result0ne = await getTypeById(categoryId);
            if(result0ne.status === 0){
                let typeOne = result0ne.data.name;
                this.setState({typeOne});
            } else {
                message.error(result0ne.msg);
            }
        } else {
            // 获取两个分类
            /*
            使用promise同时发出多个请求，所有请求都返回后才会进行处理，如果一个请求出错，整个都会失败
            */
            let resultsTwo = await Promise.all([getTypeById(categoryId),getTypeById(pCategoryId)]);
            if(resultsTwo[0].status === 0){
                let typeOne = resultsTwo[0].data.name;
                let typeTwo = resultsTwo[1].data.name;
                this.setState({
                    typeOne,
                    typeTwo
                })
            } else {
                message.error(resultsTwo[0].msg);
            }
        }
    }

    componentWillMount(){
        // 接收路由传过来的参数
        this.productDetail = this.props.location.state
        // console.log(this.productDetail);
    }
    componentDidMount(){
        this.getTypeName();
    }

    render(){
        const {name,desc,price,imgs,detail} = this.productDetail
        const {typeOne,typeTwo} = this.state
        const title = (
            <span>
                <Icon type="arrow-left" style={{color:"green"}}></Icon>
                <LinkButton onClick={() => this.props.history.goBack()}>返回</LinkButton>
            </span>
        )
        const extra = (
            <span>商品详情</span>
        )
        return(
            <Card title={title} extra={extra} className="product-detail">
                <List>
                    <Item>
                        <div>
                            <span className="detail-title">商品名称：</span>
                            <span>{name}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-title">商品描述：</span>
                            <span>{desc}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-title">商品价格：</span>
                            <span>￥{price}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-title">商品图片：</span>
                            {
                                imgs.map(url => {
                                    if(url){
                                        return <img src={IMG_BASE_URL + url} key={url} className="product-img" alt="商品img" />
                                    }
                                })
                            }
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-title">商品分类：</span>
                            <span>
                                {
                                    typeOne + typeTwo ? <Icon type="arrow-right" style={{color:"green",margin:"0 10px"}}></Icon> + typeTwo : ""
                                }
                            </span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-title">商品详情：</span>
                            <span>{detail}</span>
                        </div>
                    </Item>
                </List>
            </Card>
        )
    }
}
export default withRouter(productDetail)