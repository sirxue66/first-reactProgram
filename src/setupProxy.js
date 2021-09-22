const {createProxyMiddleware} = require("http-proxy-middleware")
/*
    代理配置文件，可配置多个代理，使用的是中间插件，js文件名固定，不能变，会自动加载
*/
module.exports = function(app) {
  app.use("/weather",createProxyMiddleware({
      target:'http://www.tianqiapi.com',
      changeOrigin:true,
      pathRewrite:{
          "^/weather":""
      }
  }))
   app.use("/api",createProxyMiddleware({
      target:'http://localhost:5000',
      changeOrigin:true,
      pathRewrite:{
          "^/api":""
      }
  }))
}