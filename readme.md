### 介绍
> 解决移动端开发屏幕大小不一样的问题

#### 原理
> 1rem等于html根元素的字体大小"font-size"，默认为16px
> 动态改变系统默认字体大小就能改变rem单位的大小

#### 工具说明
> 1rem为一个长度单元，rem对应的px大小会随着设配屏幕的宽度变化而变化
> 如果设配宽度小于750px，默认设备宽度的1/375为1rem
> 如果设备宽度大于等于750px，默认设备宽度的1/750为1rem
> 因为改变了系统默认字体大小，如果元素没有设置字体大小，就会变得特别小，此时需要在body上设置一个默认的字体大小
> 本工具默认设置为16rem，你可以通过赋值提供的全局对象"clearViewport"来改变body字体大小（在window.onload或DOMContentLoaded里设置无效）

#### 设置默认字体大小
##### `clearViewport`
> 全局变量
```javascript
clearViewport.fontSize="14rem"
```
