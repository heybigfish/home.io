const sendBeacon = (url, data = {}) => {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json; charset=UTF-8',
  });
  return navigator.sendBeacon(url, blob);
};
const isSupportSendBeacon = () => {
  return !!window.navigator.sendBeacon;
}
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
export {
  sendBeacon,
  isSupportSendBeacon,
  deepCopy
}