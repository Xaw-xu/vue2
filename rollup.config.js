import bable from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input:'./src/index.js', // 入口文件
    output:{
        file:'dist/umd/vue.js', //出口文件
        format:'umd',// 统一模块规范
        name:'Vue',// 打包后全局变量的名字
        sourcemap:true,// 开启源码调试，可以找到源码位置
    },
    plugins:[
        bable({
            exclude:"node_modules/**"
        }),
        process.env.ENV === 'development'? serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        }):null
    ]
}