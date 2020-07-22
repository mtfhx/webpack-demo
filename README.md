# Webpack Configuration

**webpack.config.js(Basic)**

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development'
}
```

### Generating HTML

插件：`html-webpack-plugin`

配置：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ... some codes ...
  plugins: [
    new HtmlWebpackPlugin({
      // 基于现有index文件生一份html，也就是模版
      template: 'index.html'
    })
  ]
  // ... some codes ...
}
```

### Bundling CSS

Loaders: `style-loader` , `css-loader`

Configuration:

```javascript
module.exports = {
  // ... some codes ...
  module: {
    rules: [
      {
        // 正则匹配所有拓展名为css的文件
        test: /\.css$/,
        // 先用css-loader加载css，转换成CommonJs模块；再用style-loader生成嵌入代码，以style标签形式插入到HTML页面
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  // ... some codes ...
}
```

### Bundling Images

Loaders: `url-loader` , `file-loader` , `html-loader`

Configuration:

```javascript
module.exports = {
  // ... some code ...
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        option: {
          // 图片大于4kb采取base64压缩
          limit: 8*1024,
          esModule: false,
          // 打包后的图片文件名为图片哈希值前十位
          name: '[hash:10].[ext]'
        },
      },
      // 处理html中的img标签
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          ,
        },
      },
    ],
  },
  // ... some code ...
}
```

**处理一下三种类型的图片文件**

1. CSS样式文件中的url函数
2. Js中ES模块导入，`import Image from './image.jpg'`
3. html中的img标签

### Bundling Fonts

Loaders: `file-loader`

Configuration:

```javascript
module.exports = {
  // ... some codes ...
  module: {
    rules: [
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        loader: 'file-loader',
      }
    ]
  }
}
```

## Pitfalls

### 1. Run `webpack` command: "Unexpected identifier"

- Js对象直接量，每个属性(除最后一个)后面如果缺少逗号(comma)就会报语法错误；

- 同理，数组元素后面没了逗号(comma)也会报错

- plugins属性是对象数组，用对象来表示的话也会报语法错误，比如(错误示范)：

  - ```javascript
    plugins: {
      {
        new HemlWebpackPlugin({
          template: 'index.html'
        })
      }
    }
    ```

### 2. `import 'master.css'` : "Module not found"

- 直接文件名不跟路径，css就导入不了，即使css文件和入口文件在同一个目录下
- 解决：`import './master.css'`
