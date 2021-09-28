import ajax from "./ajax";
import jsonp from "jsonp";
import Axios from "axios";
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
import { message } from "antd";
export const login = (username,password) => {
    return ajax("/api/login",{username,password},"post");
}

// 获取百度地图天气在线接口
export const getWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=FK9mkfdQsloEngodbFl4FeY3`;
    return new Promise((resolve,reject) => {
        jsonp(url,{},(res,err) => {
            console.log("会掉信息",res);
            if(!err && res.status === "success"){
                const {dayPictureUrl, weather} = res.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            } else {
                reject(err);
                message.error("获取天气失败");
            }
        })
    })
}
// 新的获取天气接口
export const newGetWeather = (city) => {
    const newUrl = `http://www.tianqiapi.com/api?version=v1&appid=23035354&appsecret=8YvlPNrz&id=${city}`;
    return new Promise((resolve,reject) => {
        let datas =Axios.get(`/weather/api?version=v1&appid=23035354&appsecret=8YvlPNrz&id=${city}`);
        datas.then(res => {
            if(res.data.data[0]){
                let weather = res.data.data[0].wea;
                let hello = res.data.data[0].air_tips;
                resolve({weather,hello});
            }else{
                reject("获取天气失败");
            }
        })
    })
    
}

// 获取一级或二级分类列表
export const getCategorys = (parentId) => {
    return ajax(`/api/manage/category/list?parentId=${parentId}`)
}
// 添加分类
export const addCategorys = (parentId,categoryName) => {
    return ajax("/api/manage/category/add",{parentId,categoryName},"post")
}
// 更新品类名
export const updateCategory = ({categoryId,categoryName}) => {
    return ajax("/api/manage/category/update",{categoryId,categoryName},"post")
}

// 根据ID获取详情信息
export const getTypeById = (categoryId) => ajax("/api/manage/category/info",{categoryId})
// 获取商品分页列表
export const productsList = (pageNum,pageSize) => ajax("/api/manage/product/list",{pageNum,pageSize}) 
// 根据描述、name搜索产品列表
export const getListByIdOrName = ({pageNum,pageSize,searchType,searchName}) => {
    return ajax("/api/manage/product/search",{pageNum,pageSize,[searchType]:searchName})
}
// 添加、更新商品
export const upadteProduct = (product) => {
    return ajax("/api/manage/product/"+(product._id ? "update" : "add"),product,"post")
}
// 商品上架、下架操作
export const changeProductStatus = (productId,status) => {
    return ajax("/api/manage/product/updateStatus",{productId,status},"post")
}
// 删除图片
export const deleteImg = (name) => ajax("/api/manage/img/delete",{name},"post")