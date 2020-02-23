import React from 'react'
import './index.less'
import { classNames } from '../_utils/utils/global'

type BtnProps = {
  children?: string,
  type?: string
}

export default function Button (props:BtnProps) {
  const { children, type = 'text' } = props
  const renderContent =
  children ? (
    <span className={classNames([
      'x-btn-com',
      {
        'type-text': type === 'text'
      }
    ])}>
      {children}
    </span>
  ) : null
  return renderContent
}
