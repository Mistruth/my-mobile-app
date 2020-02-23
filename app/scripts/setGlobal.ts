import React from 'react'
import { classNames } from '@app/utils/global'

Object.defineProperty(React.Component.prototype, 'classNames', {
  enumerable: true, // 不可枚举
  configurable: false, // 不可删除
  // writable: false,
  // value: classNames,
  get () {
    return classNames
  },
  set () {

  }
})
