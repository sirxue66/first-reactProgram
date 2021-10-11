import React,{Component} from "react"
import "./index.less"
import ReactEcharts from "echarts-for-react"
import Echars from "echarts"
import "echarts/map/js/china"
import jsonp from "jsonp"
import {message} from "antd"

class Home extends Component{
    getOptions(numList){
        let options = {
            title:{    //标题
                text:"全国疫情地图",
                link:"https://news.sina.cn/zt_d/yiqing0121",
                textStyle:{color:"black"},
                subtext:"React框架开发",
                sublink:"https://github.com/sirxue66/first-reactProgram",
                subtextStyle:{
                    color:"red"
                }
            },
            series:[
                {
                    type:"map",     //图形类型
                    map:"china",     //地图类型  中国
                    name:"确诊人数",     //用于tooltip的显示
                    roam:true,          //开启地图的放大缩小和拖动
                    label:{    //现实字体的样式
                        show:true,    //控制各个地区地名的显示
                        color:"black",
                        fontSize:15
                    },
                    itemStyle:{    //板块区域的样式
                        areaColor:"yellow",
                        // borderColor:"green"
                    },
                    emphasis:{        //控制鼠标划过的样式
                        label:{
                            show:true,
                            color:"green",
                            fontSize:18
                        },
                        itemStyle:{
                            areaColor:"orange"
                        },
                    },  
                    zoom:1.2,      //控制地图的放大缩小倍数
                    data: numList        //绑定渲染的数据
                }
            ],
            visualMap:[         //图例的样式控制
                {
                    typ:"piecewise",   //控制分段显示
                    show:true,
                    pieces:[
                        {min:10000},
                        {min:5000,max:9999},
                        {min:1000,max:4999},
                        {min:100,max:999},
                        {min:1,max:99}
                    ],
                    align:"left",
                    showLabel:true,
                    inRange:{
                        symbol:"rect",
                        color:["white","red"]
                    },
                    itemWidth:18,
                    itemHeight:12
                }
            ],
            tooltip:{
                trigger:"item",
                backgroundColor:"rgba(50,50,50,0.7)"
            }
        }
        return options
    }

    getMapdata = () => {
        const url = "https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1633792479316&callbak=jsoncallback";
        jsonp(url);
        window.jsoncallback = (value) => {
            if(value.status.code === 0){
                // console.log("数据",value);
                let numList = value.data.list;
                let optionList = numList.map(item => {
                    return {
                        name:item.name,
                        value:item.value
                    }
                });
                let options = this.getOptions(optionList);
                let echarts = Echars.init(document.querySelector("#chain-map"));
                echarts.setOption(options);
            } else {
                message.error("疫情数据获取失败，请稍候重试！");
                let echarts = Echars.init(document.querySelector("#chain-map"));
                echarts.setOption(this.getOptions());
            }
        }
    }

    componentDidMount(){
        // this.echarts = Echars.init(document.querySelector("#chain-map"));
        // this.echarts.setOption(this.getOptions());
        this.getMapdata();
    }
    render(){
        return(
            <div className="mainBackground">
                <div className="main-title">全国疫情数据实时监控</div>
                <div className="main-map">
                    <div className="charts"></div>
                    <div className="map" id="chain-map"></div>
                    <div className="charts"></div>
                </div>
            </div>
        )
    }
}
export default Home