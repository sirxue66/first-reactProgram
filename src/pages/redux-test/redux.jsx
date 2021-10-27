/*
这里是对redux 状态管理做的一个练习，原生redux的使用，没有使用中间件，
缺点：
    耦合度太高了，代码不清晰
*/

import React,{Component} from "react"
import "./redux.less"
import { Provider } from "react-redux"
import store from "../../redux/store"
import { increment, decrement } from "../../redux/actions"

export default class Redux extends Component{
    
    
    constructor(props){
        super(props)
        this.currentNum = React.createRef();
        this.state = {
            count: store.getState().test
        };
    }

    increment = () => {
        let num = this.currentNum.current.value * 1;
        store.dispatch(increment(num));
        this.setState({count: store.getState().test});
    }
    decrement = () => {
        let num = this.currentNum.current.value * 1;
        store.dispatch(decrement(num));
        this.setState({count: store.getState().test});
    }
    incrementIfOdd = () => {
        let num = this.currentNum.current.value * 1;
        if(this.state.count % 2 === 1){
            store.dispatch(increment(num));
            this.setState({count: store.getState().test});
        }
    }
    incrementIfAsync = () => {
        let num = this.currentNum.current.value * 1;
        setTimeout(() => {
            store.dispatch(increment(num));
            this.setState({count: store.getState().test});
        },2000);
    }
    render(){
        console.log(store.getState());
        let {count} = this.state
        return(
            <Provider store={store}>
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
            </Provider>
        )
    }
}