import React, { useEffect } from 'react'
import { classNames } from '../../_utils/utils/global'
import './index.less'

type OptionProps = {
  text?: string,
  focus?: boolean,
  height?: number
}

export default function Option (props:OptionProps) {
  const { text = '', focus = false, height = 0.7 } = props
  const optionDom:any = React.createRef()

  useEffect(() => {
    if (height !== 0.7) {
      setHeight(optionDom.current, height)
    }
  })

  return <div
    ref={optionDom}
    className={classNames([
      'x-select-option',
      {
        focus
      }
    ])} >
    {text}
  </div>
}

function setHeight (node:HTMLElement, height:number) {
  node.style.height = height + 'rem'
}
