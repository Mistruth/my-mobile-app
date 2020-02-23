import React, { useEffect, useState } from 'react'
import './index.less'
import Option from './option'
// import performance from '../../_utils/performance/index'
const options = [
  {
    text: '成都1'
  },
  {
    text: '成都2'
  },
  {
    text: '成都3'
  },
  {
    text: '成都4'
  },
  {
    text: '成都5'
  },
  {
    text: '万达6'
  },
  {
    text: '新都7'
  },
  {
    text: '新都8'
  },
  {
    text: '新都9'
  }
]

type ItemProps = {
  optionNumber?: number,
  optionHeight?: number
}

export default function Item (props:ItemProps) {
  const { optionNumber, optionHeight } = props
  const wholeLength = options.length
  const [firstInit, useFirstInit] = useState(true)
  const [activeIndex, useActiveIndex] = useState(0)
  const viewPortDom:any = React.createRef()
  const HandlerDom:any = React.createRef()
  const cellHeight = getCellHeight()
  useDrag(HandlerDom, useActiveIndex, cellHeight, wholeLength)
  useEffect(() => {
    if (firstInit) {
      initViewPort(viewPortDom.current, optionNumber, optionHeight)
      useFirstInit(false)
    }
  })

  return (
    <div
      className='x-scroll-item-view-port'
      ref={viewPortDom}
    >
      <div
        className='x-all-item-handler'
        ref={HandlerDom}
      >
        {options.map((item:{text:string}, index:number) =>
          <Option
            height={optionHeight}
            key={index.toString()}
            text={item.text || ''}
            focus={index === activeIndex}
          />)
        }
      </div>
    </div>
  )
}

function initViewPort (node:HTMLElement, optionNumber:number = 5, itemHeight:number = 0.7) {
  const height = optionNumber * itemHeight
  setNodeHeight(node, height)
}

function setNodeHeight (node:HTMLElement, height:number) {
  node.style.height = height + 'rem'
}

function setTouchEvent (node:HTMLElement,
  status:boolean = false,
  updateActive:Function,
  cellHeight:number,
  wholeLength:number) {
  let touchStartFn:any
  let touchMoveFn:any
  let touchEndFn:any

  if (!status) {
    node.removeEventListener('touchstart', touchStartFn)
    node.removeEventListener('touchmove', touchMoveFn)
    node.removeEventListener('touchend', touchEndFn)
  } else {
    let activeIndex:number = 0
    let startY:any
    let moveY:any
    let endY:any
    let prevY = activeIndex
    // startTime:any,
    // endTime:any,
    // startX:any,

    // moveX:any,
    // endX:any,
    touchStartFn = function (e:TouchEvent) {
      // startTime = performance()
      // startX = e.changedTouches[0].pageX
      node.style.transition = ''
      startY = e.changedTouches[0].pageY
    }

    touchMoveFn = function (e:TouchEvent) {
      // moveX = e.changedTouches[0].pageX
      updateActive(-1)
      moveY = e.changedTouches[0].pageY
      node.style.transform = `translateY(${prevY + moveY - startY}px)`
    }

    touchEndFn = function (e:TouchEvent) {
      // endTime = performance()
      // endX = e.changedTouches[0].pageX
      endY = e.changedTouches[0].pageY
      const d = prevY + endY - startY

      activeIndex = getNewActive(d, cellHeight, wholeLength)
      const currentTransY = activeIndex * (cellHeight)
      node.style.transition = 'all .3s ease'
      node.style.transform = `translateY(${-currentTransY}px)`
      prevY = -currentTransY
      updateActive(activeIndex)
    }

    node.addEventListener('touchstart', touchStartFn)
    node.addEventListener('touchmove', touchMoveFn)
    node.addEventListener('touchend', touchEndFn)
  }
}

function useDrag (node:any, callback:Function, cellHeight:number, wholeLength:number) {
  const [firstInit, useFirstInit] = useState(true)
  useEffect(() => {
    if (firstInit) {
      setTouchEvent(node.current, true, callback, cellHeight, wholeLength)
    }
    useFirstInit(false)
    return setTouchEvent(node.current, false, callback, 0, 0)
  })
}

function getCellHeight (optionHeight:number = 0.7) {
  const HtmlFontSize = +window.getComputedStyle(document.documentElement).fontSize.substr(-0, 2)
  return HtmlFontSize * optionHeight
}

function getNewActive (distance:number, cellHeight:number, wholeLength:number) {
  if (distance > 0) {
    return 0
  }

  if (distance < -wholeLength * cellHeight) {
    return wholeLength - 1
  }

  const res = distance / cellHeight
  let int = Math.floor(Math.abs(res))
  const deci = Math.abs(res) - int

  if (deci > 0.5) {
    int++
  }
  return int
}
