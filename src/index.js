import React from "react"
import ReactDom from "react-dom"

// import App from "./App.js"
import Container from "./containers/container"
import "./utils/index"
import store from "./redux/store.js"
import { Provider } from "react-redux"
ReactDom.render((
<Provider store={store}>
    <Container />
</Provider>
),document.getElementById('root'));

