import { isObject, isArray, isString } from './validate'

export function classNames (classNamesParams: any) {
  const isParamsObject = isObject(classNamesParams)
  if (isParamsObject) {
    return Object.keys(classNamesParams).reduce((map, c) => {
      return (classNamesParams)[c] ? map + ' ' + c : map
    }, '')
  }
  const isParamsArray = isArray(classNamesParams)
  if (isParamsArray) {
    return (classNamesParams).reduce((map: any, c: any) => {
      if (isString(c)) {
        return map + ' ' + c
      } else if (isObject(c) || isArray(c)) {
        return map + ' ' + classNames(c)
      } else {
        throw new TypeError('wrong classNames param type')
      }
    }, '')
  }
  throw new TypeError("function classNames'param is not a Object or Array")
}
