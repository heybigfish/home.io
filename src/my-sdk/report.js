import { isSupportSendBeacon, generateUniqueID } from './util'
import config from '../config'
import { addCache, getCache, clearCache } from './cache'
const sessionID = generateUniqueID()

// 如果浏览器不支持 sendBeacon，就使用图片打点
const sendBeacon = (function () {
  if (isSupportSendBeacon()) {
    return window.navigator.sendBeacon.bind(window.navigator)
  }
  const reportImageBeacon = function (url, data) {
    reportImage(url, data)
  }
  return reportImageBeacon
})()
/**
 * @description 上报数据
 * @param {*} data 上报数据
 * @param {*} isImmediate  是否立即上报
 * @returns 
 */
export function report (data, isImmediate = false) {
  if (!config.reportUrl) {
    console.error('请设置上传 url 地址')
  }

  const reportData = JSON.stringify({
    id: sessionID,
    appID: config.appID,
    userID: config.userID,
    data,
  })

  if (isImmediate) {
    sendBeacon(config.reportUrl, reportData)
    return
  }
  // window.requestIdleCallback() 方法插入一个函数，这个函数将在浏览器空闲时期被调用
  // 这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。
  //函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      sendBeacon(config.reportUrl, reportData)
    }, { timeout: 3000 })
  } else {
    setTimeout(() => {
      sendBeacon(config.reportUrl, reportData)
    })
  }
}

let timer = null
/**
 * @description 延迟上报，3秒内没有新数据将执行上报。
 * @param {any} data 上报数据.
 * @param {number} [timeout=3000] 延迟时间.
 * @return {undefined} 
 */
export function lazyReportCache (data, timeout = 3000) {
  addCache(data)
  clearTimeout(timer)
  timer = setTimeout(() => {
    const data = getCache()
    if (data.length) {
      report(data)
      clearCache()
    }
  }, timeout)
}

export function reportWithXHR (data) {
  // 1. 创建 xhr 对象
  let xhr = new XMLHttpRequest()
  // 2. 调用 open 函数
  xhr.open('POST', config.reportUrl)
  // 3. 调用 send 函数
  xhr.send(JSON.stringify(data))
}
/**
 * 上报数据的降级方案
 * @param {string} url - 上传链接.
 * @param {object} data - 上传数据.
 * @return {undefined} .
 */
export function reportImage (url, data) {
  const img = new Image();
  img.src = url + '?reportData=' + encodeURIComponent(JSON.stringify(data));
}