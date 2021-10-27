/*
这里是对redux 状态管理做的一个练习，原生redux的使用，没有使用中间件，
缺点：
    耦合度太高了，代码不清晰
*/

import React,{Component} from "react"
import "./redux.less"
import PropTypes from "prop-types"

export default class Redux extends Component{
    
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.currentNum = React.createRef();
    }

    increment = () => {
        let num = this.currentNum.current.value * 1;
        this.props.increment(num);
    }
    decrement = () => {
        let num = this.currentNum.current.value * 1;
        this.props.decrement(num);
    }
    incrementIfOdd = () => {
        let num = this.currentNum.current.value * 1;
        if(this.props.count % 2 === 1){
            this.props.increment(num);
        }
    }
    incrementIfAsync = () => {
        let num = this.currentNum.current.value * 1;
        setTimeout(() => {
            this.props.increment(num);
        },2000);
    }
    render(){
        let {count} = this.props
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
                </div>
            </div>
        )
    }
}