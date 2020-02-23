export function isObject (obj: {}):boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray (arr: []):boolean {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function isString (str: string):boolean {
  return Object.prototype.toString.call(str) === '[object String]'
}

export function isFunction (fn: Function):boolean {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
