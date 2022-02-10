### 介绍
* 解决H5开发中页面自适应的问题，尤其是移动端开发

### 原理
* 1rem等于html根元素的字体大小"font-size"，默认为16px
* 动态改变系统默认字体大小就能改变rem单位的大小

### 下载

使用 npm 安装

```shell
npm i clear-viewport -S
```

使用 script 标签导入

```html
<script src="https://gitee.com/xlou/clear-viewport/raw/master/dist/clear-viewport.min.js"></script>
<!-- 建议下载到本地使用 -->
<script>
  cvp.init()
</script>
```

### 使用

模块化引入

```javascript
import {cvp} from 'clear-viewport'

cvp.init({
  width:375, // 目标屏幕的宽（将目标屏幕分为多少个单位），默认为 375
  mobile:true, // 是否开启移动端兼容模式，兼容微信、QQ自带浏览器，默认为 true
  fontSize:"0.16rem", // 页面默认字体的大小，设置在 body 标签上，端兼容模式下默认为 "0.16rem"
  scalable:false // 移动端页面是否支持缩放，默认为 false
})
/*
  mobile 设置为 false 时，如，设计稿中目标的宽为 20px ，那么代码中就设置 20rem
  mobile 为 true 时（即开启移动端兼容模式），如果设计稿中目标的宽为 20px ，那么代码中就设置 0.2rem（即实际值除以 100）
*/

cvp.info
/* 
  该属性返回当前窗口的信息
  {
    docInfo:{...}, 返回当前窗口信息
    options:{...} 返回 clear-viewport 各配置项的信息
  }
*/
```
