import React from "react"
import ReactDom from "react-dom"

import App from "./App.js"
import "./utils/index"
import store from "./redux/store.js"
import { Provider } from "react-redux"
// function a(){
//     console.log("store状态值",store.getState())
// }
// a()
ReactDom.render((
<Provider store={store}>
    <App />
</Provider>
),document.getElementById('root'));

