const {override, fixBabelImports,addLessLoader} = require('customize-cra');
// 配置antd按需加载
module.exports = override( 
    fixBabelImports('import', { 
        libraryName: 'antd', 
        libraryDirectory: 'es', 
        style: true, 
    }),
    // 使用addLessLoader修改antd組件默認主題
    addLessLoader({ 
        lessOptions:{
            less:{
                javascriptEnabled: true
            },
            modifyVars: {'@primary-color': '#17d56b'}
        }
    }),    
);