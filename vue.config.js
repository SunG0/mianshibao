// 导包
const autoprefixer = require('autoprefixer')
// 导包
const pxtorem = require('postcss-pxtorem')

const path = require('path')
// 暴露出去
module.exports = {
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  // 插件选项
  pluginOptions: {
    // style-resources-loader 插件的配置
    'style-resources-loader': {
      // 处理的是 less
      preProcessor: 'less',
      // 路径 所有/src/styles/下面的less文件
      patterns: [path.resolve(__dirname, './src/styles/*.less')]
    }
  }
}
