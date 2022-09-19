const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 端口号
    port: 8888,
    // 主机名
    host: "localhost",
    // 启动项目时是否自动打开浏览器
    open: true,
    // 是否开启https
    https: false,
    // 配置跨域
    proxy: {
      "/dev1-api": {
        // 跨域的地址
        target: 'http://localhost:3000',
        // 开启跨域
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          "^/dev1-api": ''
        }
      }

    }
  }
})