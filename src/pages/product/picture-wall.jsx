/*
 *图片上传组件 
 */
import React,{Component} from "react"
import PropTypes from 'prop-types'
import {Upload, Icon, Modal, message} from 'antd'
import {deleteImg} from "../../api/index"
import {UPLOAD_IMG_NAME,IMG_BASE_URL} from "../../utils/variableGlobal"

class PictureWall extends Component {

    static propTypes ={
        imgs:PropTypes.array
    }

    // state = {
    //     previewVisible: false, // 是否显示大图预览弹窗
    //     previewImage: '', // 大图的 url地址
    //     fileList: [] // 所有需要显示的图片信息对象的数组
    //     }

    constructor(props){
        super(props)
        let endImgs = [];
        // 接受父组件传来的图片名称，进行格式化处理
        let imgs = this.props.imgs;
        console.log("接收父组件的图片地址",imgs);
        if(imgs && imgs.length > 0){
            endImgs = imgs.map((img,index) => {
                return (
                    {
                        uid:-index,
                        name:img,
                        status:"done",    //done标识图片状态，完成
                        url:IMG_BASE_URL + img
                    }
                )
            });
        }
        this.state = {
            previewVisible: false, // 是否显示大图预览弹窗
            previewImage: '', // 大图的 url地址
            fileList: endImgs // 所有需要显示的图片信息对象的数组
            }

    }

    // 获取该组件的所有上传图片的名称供父组件收集数据
    getImagesName = () => {
        return this.state.fileList.map(file => file.name);   //这个name是图片上传到服务器后返回的图片名称
        
    }

    // 预览大图
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl, // 需要显示的大图的 url
            previewVisible: true,
            })
    }
    handleChange = async(File) => {    //file当前操作的图片，filedList 图片数组
        let {file,fileList} = File;
        console.log("file",file);
        // debugger
        if(file.status === "done"){
            let result = file.response;
            if(result.status === 0){  //上传成功
                message.success("图片上传成功");
                let {name,url} = result.data;
                file = fileList[fileList.length - 1];
                file.name = name;      //将上传成功自动生成的图片名称和地址换成后台返回的图片名称和地址，也可以说是换成在线地址
                file.url = url;
                // console.log("图片名称",file.name);
            } else {
                message.error("图片上传失败");
            }
        } else if(file.status === "removed"){
            // console.log("删除图片",file.name);
            let result = await deleteImg(file.name);
            if(result.status === 0){
                message.success("图片删除成功");
            } else {
                message.error("图片删除失败");
            }
        }
        this.setState({   //更新状态
            fileList
        })
    }
    handleCancel = () =>{
        this.setState({
            previewVisible:false
        });
    }
    render(){
        const {previewVisible,previewImage,fileList} = this.state
        const uploadButton = (
            <div>
            <Icon type="plus"/>
            <div>上传图片</div>
            </div>
            )
        return(
            <div>
                <Upload
                action="/api/manage/img/upload"    //上传地址
                accept="image/*"                   //限制上传文件类型
                name= {UPLOAD_IMG_NAME}        //发给后台的请求参数名
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                >
                    {fileList.length < 5  ? uploadButton : null}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="productPic" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        )
    }
}

export default PictureWall