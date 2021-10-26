import React from "react"
import ReactDom from "react-dom"

import App from "./App.js"
import "./utils/index"
// import store from "./redux/store"
// function n(){
//     console.log(store.getState());
// }
// n();
ReactDom.render(<App />,document.getElementById('root'));

// store.subscribe(() => {    //store数据变化时的监听，来更新视图
//     ReactDom.render(<App />,document.getElementById('root'));
// })