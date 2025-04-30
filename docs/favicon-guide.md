# Favicon 指南

本文档提供了如何为旅行规划应用创建和使用favicon的详细说明。

## 关于项目favicon

项目中已包含一个SVG格式的favicon（`public/favicon.svg`），它是一个简单的旅行主题图标，包含：
- 蓝色背景圆形
- 白色飞机图标
- 红色地图标记

SVG格式的favicon已经在`src/app/layout.tsx`中配置，现代浏览器可以直接使用它。但为了最大兼容性，建议同时提供`.ico`格式。

## 创建favicon.ico文件

由于`.ico`是二进制格式，需要使用专门的工具转换。以下是几种方法：

### 方法1：使用在线转换工具

1. 访问以下任一在线转换工具：
   - [Favicon.io](https://favicon.io/favicon-converter/)
   - [Convertio](https://convertio.co/svg-ico/)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)

2. 上传`public/favicon.svg`文件
3. 下载生成的`.ico`文件
4. 将下载的文件重命名为`favicon.ico`并放在`public`目录中

### 方法2：使用图像编辑软件

1. 使用图像编辑软件（如GIMP、Photoshop、Illustrator等）打开SVG文件
2. 导出/保存为`.ico`格式
3. 将生成的文件放在`public`目录中

## 创建完整的favicon集合（可选）

为了支持各种设备和平台，可以创建一套完整的favicon：

1. 访问[RealFaviconGenerator](https://realfavicongenerator.net/)
2. 上传您的SVG图标
3. 自定义各种设备的图标外观
4. 下载生成的favicon包
5. 将文件放在`public`目录中
6. 按照生成的HTML代码更新`src/app/layout.tsx`中的metadata部分

## 在Next.js中使用favicon

Next.js 13+使用Metadata API来设置favicon。项目中已经在`src/app/layout.tsx`文件中配置了基本的favicon：

```typescript
export const metadata: Metadata = {
  title: '旅游规划',
  description: '旅游行程规划与费用对比',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}
```

如果您创建了完整的favicon集合，可以按照RealFaviconGenerator提供的指南更新此配置。

## 验证favicon

部署应用后，可以通过以下方式验证favicon是否正确显示：

1. 在不同的浏览器中访问您的应用
2. 检查浏览器标签中是否显示了favicon
3. 将网站添加到移动设备主屏幕，检查图标是否正确显示
