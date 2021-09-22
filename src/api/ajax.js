import Axios from "axios";
import { message } from "antd";
// import { reject, resolve } from "q";
const ajax = function(url,data={},method="get"){
    return new Promise((resolve,reject) => {
        let promise;
        if(method === "get"){
            promise = Axios.get(url,{pramas:data});
        } else if(method === "post"){
            promise = Axios.post(url,data);
        }
        promise.then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error.message);
            message.error("请求出错",error.message);
        })
    })
}

export default ajax