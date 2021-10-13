import React,{Component} from "react"
import "./index.less"
import * as Echars from "echarts"
import "echarts/map/js/china"
import jsonp from "jsonp"
import {message} from "antd"

class Home extends Component{
    getMapOptions(numList){
        let options = {
            title:{    //标题
                text:"全国疫情地图",
                link:"https://news.sina.cn/zt_d/yiqing0121",
                textStyle:{color:"red"},
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
                        borderColor:"blue",
                        shadowOffsetX:0,
                        shadowOffsetY:0,
                        shadowBlur:5,
                        shadowColor:"red"
                    },
                    emphasis:{        //控制鼠标划过的样式
                        label:{
                            show:true,
                            color:"red",
                            fontSize:18
                        },
                        itemStyle:{
                            areaColor:"rgb(189 55 245 / 65%)",
                            borderColor:"red",
                            borderWidth:2
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
                        color:["blue","red"],
                        hoverLink:true
                    },
                    itemWidth:18,
                    itemHeight:12,
                    textStyle:{
                        color:"red"
                    }
                }
            ],
            tooltip:{
                trigger:"item",
                backgroundColor:"rgba(50,50,50,0.7)"
            }
        }
        return options
    }

    getPieOptionOne(dataList){
        let options = {
            title:{               //标题
                text:"境外输入各省占比",
                subtext:"Top10",
                left:"center",
                textStyle: {
                    color:"red",
                    fontSize:15,
                    fontWeight:500
                }
            },
            tooltip:{    
                show:true,         //提示框
                trigger:"item",
                backgroundColor:"rgba(50,50,50,0.7)"
            },
            legend:{               //图例
                type:"scroll",
                bottom:2,
                textStyle:{
                    color:"red"
                }
            },
            series:[
                {
                    name:"境外占比",
                    type:"pie",
                    radius:[0,"50%"],    //饼图的半径
                    data:dataList,
                    colorBy:"data",     //按数据区分颜色
                    itemStyle: {
                        // color:"green",
                        borderWidth:2,
                        borderColor:"blue",
                        shadowOffsetX:0,
                        shadowOffsetY:0,
                        shadowBlur:5,
                        shadowColor:"red"
                    },
                    emphasis: {
                        scale:true,      //开启高亮放大
                        focus:"series",        //高亮聚焦
                        shadowBlur: 10, 
                        shadowOffsetX: 0, 
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        itemStyle: {
                            borderColor:"red",
                            borderWidth:2,
                            shadowOffsetX:0,
                            shadowOffsetY:0,
                            shadowBlur:5,
                            shadowColor:"blue"
                        }
                    }
                }
            ]
        }
        return options;
    }

    getBarOptionOne(dataList){
        let options = {
            title:{
                text:"最新疫情实况",
                subtext:"实时跟进",
                left:"left",
                textStyle: {
                    color:"red",
                    fontSize:15,
                    fontWeight:500
                }
            },
            tooltip:{
                show:true,
                blur:"axis",
                backgroundColor:"rgba(50,50,50,0.7)"
            },
            toolbox: {            //工具栏
                show: true,
                feature: {
                  dataView: { show: true, readOnly: true },       //显示视图数据，只读
                  magicType: { show: true, type: ['line', 'bar'] },         //图形切换
                  restore: { show: true },         
                  saveAsImage: { show: true }   //保存图片
                }
              },
              xAxis:[
                {
                    show:true,
                    nameTextStyle:{
                        color:"red",
                        fontSize:15,
                        fontWeight:500
                    },
                    data:["现存确诊","现存疑似","现存无症状"]
                }
              ],
              yAxis:[
                {
                    show:true,
                    type:"value"
                }
              ],
              series:[
                  {
                      name:"人数",
                      type:"bar",
                      data: dataList,
                      barWidth:30
                  }
              ]
        }
        return options;
    }

    getMapdata = () => {
        const url = "https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1633792479316&callbak=jsoncallback";
        jsonp(url);
        window.jsoncallback = (value) => {
            if(value.status.code === 0){
                console.log("数据",value);
                // 境外输入top10
                let {jwsrTop} = value.data;
                let onePieList = jwsrTop.map(citem => {
                    return {
                        name:citem.name,
                        value:citem.jwsrNum
                    }
                })
                this.makeChartOne(onePieList);
                // 现存病例数据
                let {econNum,asymptomNum,sustotal} = value.data;
                let nowData = [econNum,asymptomNum,sustotal];
                this.makeChartTwo(nowData);
                // 地图数据源
                let numList = value.data.list;
                let optionList = numList.map(item => {
                    return {
                        name:item.name,
                        value:item.value
                    }
                });
                let options = this.getMapOptions(optionList);
                let echarts = Echars.init(document.querySelector("#chain-map"));
                echarts.setOption(options);
            } else {
                message.error("疫情数据获取失败，请稍候重试！");
                let echarts = Echars.init(document.querySelector("#chain-map"));
                echarts.setOption(this.getMapOptions());
            }
        }
    }

    makeChartOne = (list) => {
        let option = this.getPieOptionOne(list);
        let echars = Echars.init(document.querySelector("#chart-one"));
        echars.setOption(option);
    }

    makeChartTwo = (list) => {
        let option = this.getBarOptionOne(list);
        let echars = Echars.init(document.querySelector("#chart-two"));
        echars.setOption(option);
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
                    <div className="charts">
                        <div className="chart-one" id="chart-one"></div>
                        <div className="chart-two" id="chart-two"></div>
                    </div>
                    <div className="map" id="chain-map"></div>
                    <div className="charts">
                        <div className="chart-one" id="chart-three"></div>
                        <div className="chart-two" id="chart-four"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home