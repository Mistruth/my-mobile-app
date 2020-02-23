let time:any
let loadTime:number = 0
const per = window.performance

if (per && per) {
  time = function () {
    return per.now() // tab 打开的时间
  }
} else if (Date.now) {
  time = function () {
    return Date.now() - loadTime
  }
  loadTime = Date.now()
} else {
  time = function () {
    return new Date().getTime() - loadTime
  }
  loadTime = new Date().getTime()
}

export default time
