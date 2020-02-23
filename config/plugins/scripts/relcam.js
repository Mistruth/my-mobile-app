
(function () {
  var docEl = document.documentElement
  var originClassName = docEl.className
  var timer = null
  var prevWidth = 0

  originClassName = originClassName ? (originClassName + ' ') : ''
  var calculateSize = function (width) {
    var clientWidth = docEl.clientWidth
    var clientHeight = docEl.clientHeight

    clearTimeout(timer)
    // eslint-disable-next-line
    if (!clientWidth || prevWidth !== 0 && self.frameElement && self.frameElement.tagName === 'IFRAME') {
      timer = setTimeout(calculateSize, 100)
      return
    }
    if (prevWidth === clientWidth) return

    var BASE_FONT_SIZE = 100
    var minWidth = Math.min(clientWidth, clientHeight)
    var arr = []

    if (minWidth !== clientWidth) {
      arr.push('wide-screen-view-port')
    }
    if (minWidth >= 1.3 * 375) {
      arr.push('max-screen-view-port')
    }
    docEl.className = originClassName + arr.join(' ')
    docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / width) + 'px'
    prevWidth = clientWidth
  }

  var addRem = function (width) {
    calculateSize(width)
    if (document.addEventListener) {
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      window.addEventListener(resizeEvt, calculateSize.bind(null, width), false)
      document.addEventListener('DOMContentLoaded', calculateSize.bind(null, width), false)
    } else {
      window.onload = function () {
        calculateSize(width)
      }
      window.onresize = window.onload
    }
  }
  addRem(750)
}())
