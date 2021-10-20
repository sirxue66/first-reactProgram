import React,{Component} from "react"
// import { withRouter } from "react-router"
import {Card,Icon,Form,Input,Button,message,Cascader} from "antd"
import LinkButton from "../../components/common/linkButton"
import {getCategorys,upadteProduct} from "../../api/index"
import PictureWall from "./picture-wall"
import RichTextEditor from "./rich-text-editor"
const {Item} = Form
const {TextArea} = Input
class ProductAdd extends Component{
    state = {
        options:[],    //显示联级列表的数组
    }
    constructor(props){
        super(props)
        this.picWall = React.createRef();   //创建一个Dom容器，用来获取图片子组件
        this.textEditor = React.createRef();   //创建一个Dom容器，用来获取文本编辑器子组件
    }
    // 提交表单数据
    submit = () => {
        // debugger
        this.props.form.validateFields( async(err,values) => {
            if(!err){
                // 收集数据
                let {name, desc, price,categoryIds} = values
                let imgs = this.picWall.current.getImagesName();
                let detail = this.textEditor.current.getDetail();
                console.log("图片地址",imgs);
                let pCategoryId = ''
                let categoryId = ''
                if(categoryIds.length===1) { // 选择的是一级分类
                    pCategoryId = '0'
                    categoryId = categoryIds[0]
                } else { // 选择的是二级分类
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                // 将数据封装一下
                let product = {name, desc, price, pCategoryId, categoryId, detail, imgs}
                // panduan是更新还是添加
                if(this.isUpdate){
                    product._id = this.product._id;
                }
                let results = await upadteProduct(product);
                if(results.status === 0){
                    message.success("商品保存成功！");
                    this.props.history.goBack();
                } else {
                    message.error("商品保存失败！");
                }

            } else {
                alert("请检查内容是否符合规定!");
            }
        })
    }
    // 校验价格
    validatePrice =　(rule,value,callback) => {
        // *1转换为数字
        if(value*1 < 0){
            callback("价格不能小于0！")
        } else {
            callback();
        }
    }
    // 获取分类列表
    getCategorys = async(parentId) => {
        let result = await getCategorys(parentId);
        if(result.status === 0){
            if(parentId === "0"){
                let categorys = result.data;
                // 初始化分一级类列表
                this.initOptions(categorys);
            } else {
                return result.data; 
            }
        } else {
            message.error(result.msg);
        }  
    }
    // 处理数据为联级选择的格式
    initOptions = async(categorys) => {
        let options = categorys.map(item => {
            return {
                value: item._id, 
                label: item.name, 
                isLeaf: false    //代表当前级别有下一级
            }
        })
        this.setState({
            options:options
        })

        // 如果是一个二级分类的商品更新，为了显示该商品的分类联机，需要提前获取该商品的二级分类列表
        const {isUpdate,product} = this
        const {pCategoryId} = product
        if(isUpdate && pCategoryId !== "0"){  //是商品更新并且是二级商品更新
            // 获取对应的二级分类列表
            let subCategorys = await this.getCategorys(pCategoryId);
            // console.log("二级分类",subCategorys);
            let childOptions = subCategorys.map(item => {
                return {
                    value: item._id, 
                    label: item.name, 
                    isLeaf: true
                }
            });
            // 寻找对应的一级option对象,根据一级分类列表的value来找对应的一级列表
            let targetOption = options.find(option => option.value === pCategoryId);
            targetOption.children = childOptions;   //将二级分类列表添加到对应的一级分类children上
            this.setState({
                options: [...this.state.options]
            })
        }
    }
    getSubCategorys = async(selectedOptions) => {
        const targetOption = selectedOptions[0]   //获取当前选中项
        targetOption.loading = true;
        // debugger
        let result = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        if(result && result.length >= 1){
            let subCategory = result.map(citem => ({
                value: citem._id, 
                label: citem.name, 
                isLeaf: true
            }));
            targetOption.children = subCategory;    
        } else {
            targetOption.isLeaf = true;
        }
        //无论有无数据都需要更新一下数据状态，否则loading状态无法更新，会一直处于请求状态 
        this.setState({
            options: [...this.state.options]
        })
    }

    componentDidMount(){
        this.getCategorys('0');
    }
    componentWillMount(){
        const product = this.props.location.state;  //接收路由跳转传来的参数
        this.isUpdate = !!product;    //添加标识来判断是添加还是更新，有数据就是更新，没有就是添加  （!!意思是强制转换为boolean类型，有product就是true，没有就是false）
       console.log("接收的数据888",product);
        this.product = product || {};   //存进this中
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const {options} = this.state
        const {product} = this
        const {pCategoryId, categoryId,imgs,detail} = product  //将两个联级id取出来
        let categoryIds = [];
        if(this.isUpdate){
            if(pCategoryId === "0"){
                categoryIds.push(pCategoryId);
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
        }
        const title = (
            <span>
                <Icon type="arrow-left" style={{color:"green"}}></Icon>
                <LinkButton onClick={() => this.props.history.goBack()}>返回</LinkButton>
            </span>
        )
        const extra = (
            <span>{this.isUpdate ? "更新商品" : "添加商品"}</span>
        )
        // 指定lable和Input等的布局占比
        const formItemLayout = {
            labelCol:{span:3},
            wrapperCol:{span:12}
        }
        
        return(
            <Card title={title} extra={extra}>
                <Form>
                    <Item label="商品名称" {...formItemLayout}>
                    {
                        getFieldDecorator("name",{
                            initialValue:product.name,
                            rules:[
                                {required:true,message:"商品名称不能为空！"}
                            ]
                        })(
                            <Input placeholder="请输入商品名称"></Input>       
                        )
                    }
                    </Item>
                    <Item label="商品描述" {...formItemLayout}>
                    {
                        getFieldDecorator("desc",{
                            initialValue:product.desc,
                            rules:[
                                {required:true,message:"商品描述不能为空！"}
                            ]
                        })(
                            <TextArea placeholder="请输入商品描述"></TextArea>
                        )
                    }
                    </Item>
                    <Item label="商品价格" {...formItemLayout}>
                    {
                        getFieldDecorator("price",{
                            initialValue:product.price,
                            rules:[
                                {required:true,message:"商品价格不能为空！"},
                                {required:true,validator:this.validatePrice}
                            ]
                        })(
                            <Input placeholder="请输入商品价格" type="number" addonAfter="￥"></Input>      
                        )
                    } 
                    </Item>
                    <Item label="商品分类" {...formItemLayout}>
                    {
                        getFieldDecorator("categoryIds",{
                            initialValue:categoryIds,
                            rules:[
                                {required:true,message:"请选择商品类型！"}
                            ]
                        })(
                            <Cascader
                            placeholder="请选择商品分类"
                            options={options} 
                            loadData={this.getSubCategorys}
                            ></Cascader>     
                        )
                    } 
                    </Item>
                    <Item label="商品图片" {...formItemLayout}>  
                        <PictureWall ref={this.picWall} imgs={imgs}></PictureWall>
                    </Item>
                    <Item label="商品详情" {...formItemLayout}>  
                        <RichTextEditor ref={this.textEditor} detail={detail}></RichTextEditor>
                    </Item>
                    <Item {...formItemLayout}>  
                        <Button type="primary" onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(ProductAdd) 