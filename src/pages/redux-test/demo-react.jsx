/*
注册没有做，可以在前台做
这里是对redux 状态管理做的一个练习
*/

import React,{Component} from "react"
import "./redux.less"

export default class Redux extends Component{
    state = {
        count:0
    }
    constructor(props){
        super(props)
        this.currentNum = React.createRef();
    }
    toRedux = () => {
        this.props.history.push("/redux");
    }

    increment = () => {
        let num = this.currentNum.current.value * 1;
        this.setState(state => ({count: state.count + num}));
    }
    decrement = () => {
        let num = this.currentNum.current.value * 1;
        this.setState(state => ({count: state.count - num}));
    }
    incrementIfOdd = () => {
        let num = this.currentNum.current.value * 1;
        if(this.state.count % 2 === 1){
            this.setState(state => ({count: state.count + num}));
        }
    }
    incrementIfAsync = () => {
        let num = this.currentNum.current.value * 1;
        setTimeout(() => {
            this.setState(state => ({count: state.count + num}));
        },2000);
    }
    render(){
        let {count} = this.state
        return(
            <div>
                <p>click {count} times </p>
                <div className="content">
                    <select ref={this.currentNum}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    {/* 如果是奇数就增加 */}
                    <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                    {/* 如果异步就增加 */}
                    <button onClick={this.incrementIfAsync}>increment if async</button>
                    <button onClick={this.toRedux}>{"--->Redux版本"}</button>
                </div>
            </div>
        )
    }
}