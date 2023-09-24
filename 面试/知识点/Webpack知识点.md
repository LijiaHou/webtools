# WebPack

本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

## 入口（entry）
指示webpack应该以哪一个模块，来作为构建内部依赖图的起点

默认值是 `./src/index.js`，可以通过`entry`属性配置

## 输出（output）
output属性告诉webpack在哪里输出创建的bundle，以及如何命名

## loader
### 概念
webpack 只能理解 js和JSON文件，这是开箱可用的自带能力。loader能让webpack能够处理其他类型的文件，并转为有效模块，以供程序使用和添加依赖图。

我们在 `module.rules` 数组下配置 loader，如：

```js
module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [Autoprefixer],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
              },
            },
          ],
        },
    ],
},
```

### 常用的 Loader
- **css-loader**：解析加载 css 文件
- **style-loader**：把 css 添加到 DOM 中，可选 `<style>\<link>` 标签等方式
- **sass-loader**：解析加载 sass 文件，使用需要在 css-loader 前执行
- **postcss-loader**：可以对 css 文件使用 js 的 plugin 进行处理，比如使用 autoprefixer 自动添加各厂商的前缀（-moz、-webkit等）
- **babel-loader**：转译 js 文件，将 es6、es7 等新的语法，转为 es5
- **file-loader**：将文件发送到输出目录（对应webpack5的 asset/resource）
- **url-loader**：将文件转为 data URI 内联到 bundle 中（对应webpack5的 asset/inline）


## Plugin
插件可用来拓展功能，包括：打包优化、资源管理、注入环境变量

想用一个插件，需要 `require()` 它，然后添加到 `module.plugins` 数组下，如：

```js
module: {
	...,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:10].css',
			chunkFilename: '[name].[contenthash:10].css',
		}),
	],
}
```

### 常用的 Plugin
- **HtmlWebpackPlugin**：帮助生成 index.html 的
- **MiniCssExtractPlugin**：压缩 css 的
- **TerserWebpackPlugin**：使用 terser 来压缩 js 
- **SplitChunksPlugin**：对分包进行控制
- **DefinePlugin**：在 webpack 编译时生成全局变量的，比如定义一个 ENVIRONMENT 变量，然后在 dev、test、production 的配置文件中分别赋值，就可以在代码中区分环境了
- **BundleAnalyzerPlugin**：对打包后的 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式
 