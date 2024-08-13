// navigator.sendBeacon 是一个用于发送少量数据到服务器的浏览器API

const sendBeacon = (url, data = {}) => {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json; charset=UTF-8',
  });
  return navigator.sendBeacon(url, blob);
};

// 判断环境是否支持 navigator.sendBeacon
const isSupportSendBeacon = () => {
  return !!window.navigator.sendBeacon;
}

// 简易深拷贝
const deepCopy = (target) => {
  if (typeof target === 'object') {
    const result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }
    return result
  }
  return target
}
// 获取当前页面url
const getPageURL = () => {
  return window.location.href
}
// 加载完执行
const executeAfterLoad = (callback) => {
  if (document.readyState === 'complete') {
    callback()
  } else {
    const onLoad = () => {
      callback()
      window.removeEventListener('load', onLoad, true)
    }

    window.addEventListener('load', onLoad, true)
  }
}
// isSupportPerformanceObserver 
const isSupportPerformanceObserver = () => {
  return !!window.PerformanceObserver
}
export {
  sendBeacon,
  isSupportSendBeacon,
  deepCopy,
  getPageURL,
  isSupportPerformanceObserver,
  executeAfterLoad
}