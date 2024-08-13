import { getPageURL, isSupportPerformanceObserver, executeAfterLoad, originalOpen, originalSend, originalProto } from './utils/util'
import { lazyReportCache } from './utils/report'

function observe (name) {
  if (!isSupportPerformanceObserver()) return

  const entryHandler = (list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === name) {
        observer.disconnect()
      }

      const json = entry.toJSON()
      delete json.duration

      const reportData = {
        ...json,
        subType: entry.name,
        type: 'performance',
        pageURL: getPageURL(),
      }

      lazyReportCache(reportData)
    }
  }

  const observer = new PerformanceObserver(entryHandler)
  // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
  observer.observe({ type: 'paint', buffered: true })

}
// FP
// FP（First Paint）首次绘制，即浏览器开始绘制页面的时间点,渲染出第一个像素点。
export function observeFP () {
  observe('first-paint')
}

// FCP
// FCP（First Contentful Paint）：首次内容绘制，即浏览器首次绘制DOM内容的时间点，表示渲染出第一个内容。
export function observeFCP () {
  observe('first-contentful-paint')
}

// LCP
// LCP（Largest Contentful Paint）：最大内容绘制，即视口中最大的图像或文本块的渲染完成的时间点
export default function observeLCP () {
  if (!isSupportPerformanceObserver()) {
    return
  }

  const entryHandler = (list) => {

    if (observer) {
      observer.disconnect()
    }

    for (const entry of list.getEntries()) {
      const json = entry.toJSON()
      delete json.duration

      const reportData = {
        ...json,
        target: entry.element?.tagName,
        name: entry.entryType,
        subType: entry.entryType,
        type: 'performance',
        pageURL: getPageURL(),
      }

      lazyReportCache(reportData)
    }
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
}

// DOMContentLoaded

export function observerDOMContentLoaded () {
  ['DOMContentLoaded'].forEach(type => onEvent(type))
}
// onload
export function observerLoad () {
  ['load'].forEach(type => onEvent(type))
}
function onEvent (type) {
  function callback () {
    lazyReportCache({
      type: 'performance',
      subType: type.toLocaleLowerCase(),
      startTime: performance.now(),
    })

    window.removeEventListener(type, callback, true)
  }

  window.addEventListener(type, callback, true)
}

// 收集资源加载时间

export function observeEntries () {
  executeAfterLoad(() => {
    observeEvent('resource')
  })
}

// 收集资源加载时间
export function observeEvent (entryType) {
  function entryHandler (list) {
    const data = list.getEntries()
    for (const entry of data) {
      if (observer) {
        observer.disconnect()
      }

      lazyReportCache({
        name: entry.name, // 资源名称
        subType: entryType,
        type: 'performance',
        sourceType: entry.initiatorType, // 资源类型
        duration: entry.duration, // 资源加载耗时
        dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS 耗时
        tcp: entry.connectEnd - entry.connectStart, // 建立 tcp 连接耗时
        redirect: entry.redirectEnd - entry.redirectStart, // 重定向耗时
        ttfb: entry.responseStart, // 首字节时间
        protocol: entry.nextHopProtocol, // 请求协议
        responseBodySize: entry.encodedBodySize, // 响应内容大小
        responseHeaderSize: entry.transferSize - entry.encodedBodySize, // 响应头部大小
        resourceSize: entry.decodedBodySize, // 资源解压后的大小
        startTime: performance.now(),
      })
    }
  }

  let observer
  if (isSupportPerformanceObserver()) {
    observer = new PerformanceObserver(entryHandler)
    observer.observe({ type: entryType, buffered: true })
  }
}

// 收集接口请求时间

export function name(params) {
  
}