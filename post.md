# 移动端适配插件推荐，轻松解决移动端屏幕自适应问题，浏览器适配，解决不同屏幕分辨率、不同窗口适配问题

## 插件地址

gitee: https://gitee.com/xlou/clear-viewport.git

github: https://github.com/omlou/clear-viewport.git

npm: https://www.npmjs.com/package/clear-viewport

## 使用

### script 标签引入

``` html
<script src="https://gitee.com/xlou/clear-viewport/raw/master/dist/clear-viewport.min.js"></script>
<!-- 建议下载到本地使用，放在<head>标签内可以提供最优性能 -->
<script>
  cvp.init({/* options */})
</script>
```

### 在 Vue、React 和 Angular 项目中使用

``` shell
npm i clear-viewport -S
```

``` js
/* 移动端 H5 页面推荐的配置，这里的设计稿是 750px ，如果是 375px ，则不用配置 width */
cvp.init({
  width:750,
  fontSize:'0.14rem' // 默认 0.16rem
})

/* PC 端页面推荐的配置，这里的设计稿是 1920px ，可以根据设计稿调整 */
cvp.init({
  width:1920,
  metaViewport:false,
  fontSize:'0.14rem'
})

/* 如设计稿中 div 的宽是 20px ，那么在代码中就设置 0.2rem ，即设计值除以 100 */
/* 如果不想除以 100 ，可以设置 mobile:false ，但是这样微信和QQ打开页面时会错乱，其它浏览器则没问题 */
```

## 效果

可以根据屏幕或窗口的大小动态的调整页面元素和字体大小，做到在不同窗口大小中展示效果一样

此插件在页面渲染完成前就完成所用的工作，不会影响页面的加载效果

## 原理

1rem 等于 html 根元素的字体大小 "font-size" ，默认为 16px

动态改变 root 字体大小就能改变 rem 单位的大小