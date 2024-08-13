##### 上报数据方法

- 业界比较成熟的方案：使用1x1像素的gif图片上报
- navigator.sendBeacon

  navigator.sendBeacon 是一个用于发送少量数据到服务器的浏览器API

  - 异步和非阻塞。navigator.sendBeacon 是异步的，不会影响页面的性能。
  - 页面卸载之后也可以完成数据发送。用来捕获和上报页面卸载前的最有一个操作。
  - 低优先级。不会影响其他网络请求。
  - 简单易用。只需要提供上报的URL和数据。
    > 只能发送post请求，没有返回值，不能接受服务器响应。
    > 部分浏览器不支持，需要做兼容处理。**优先使用`navigator.sendBeacon`方案**,降级使用1x1像素gif图片.

  ##### 上报时机

  上报时机有三种

  - 采用 requestIdleCallback/setTimeout 延时上报
  - 在 `beforeUnload` 回调函数里上报
  - 缓存上报数据，达到一定数量后再上报

  将三种上报时机结合一起上报，

  - 先缓存上报数据，缓存到一定数量后，利用 requestIdleCallback/setTimeout 延时上报。
  - 在页面离开时统一将未上报的数据进行上报。

##### 性能数据收集上报

性能监控需要收集的数据指标需要有FP、FCP、LCP、DOMContentLoaded、onload、资源加载时间、接口请求时间
收集FP、FCP、LCP、资源加载时间具体是利用浏览器Performance API

###### 收集上报FP

FP（First Paint）首次绘制，即浏览器开始绘制页面的时间点。渲染出第一个像素点

###### 收集上报FCP

FCP（First Contentful Paint）：首次内容绘制，表示渲染出第一个内容。

###### 收集上报LCP

LCP（Largest Contentful Paint）：最大内容绘制，即视口中最大的图像或文本块的渲染完成的时间点

###### 收集上报DOMContentLoaded

DOMContentLoaded：当HTML文档被完全加载和解析完成后，DOMContentLoaded事件被触发，无需等待样式表、图像和子框架的完成加载

###### 收集上报onload数据

onload：当所有需要立即加载的资源（如图片和样式表）已加载完成时的时间点

###### 收集上报资源加载时间

###### 收集上报接口请求时间

覆写原生xhr对象方法，对方法做拦截实现接口时间收集以及上报
