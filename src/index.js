import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import store from "./redux/store.js"

import App from "./App.js"
import "./utils/index"
ReactDom.render(
<Provider store={store}>
    <App />
</Provider>,document.getElementById('root'));