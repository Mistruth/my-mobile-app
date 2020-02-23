import React from 'react'
import { MotionChildren, MotionAbstractClass, MotionFps } from './types'
import raf from 'raf'

interface TransitionProps {
  children?: MotionChildren,
  fps?:MotionFps,
  initialFps?:MotionFps
}

export class Transition extends React.Component<TransitionProps, any> implements MotionAbstractClass {
  motionStatus = 'initial'

  requestAnimateId:any = null

  constructor (props:TransitionProps) {
    super(props)
    this.state = this.getInitialFps()
  }

  getInitialFps () {
    const { initialFps = {}, fps = {} } = this.props
    return {
      initialFps,
      fps
    }
  }

  shouldMotionStart = async () => this.motionStatus === 'mounted'

  motionStart = async () => {
    raf(fpsTime => {
      this.requestAnimateId = fpsTime
    })
  }

  componentDidMount = async () => {
    this.motionStatus = 'mounted'
    const res = await this.shouldMotionStart()
    res ? this.motionStart() : () => {}
  }

  componentWillUnmount () {
    this.motionStatus = 'unmounting'
    if (this.requestAnimateId != null) {
      raf.cancel(this.requestAnimateId)
      this.requestAnimateId = null
    }
  }

  render () {
    const { children } = this.props
    const renderedChildren = children && children(this.state.currentStyle)
    return React.Children.only(renderedChildren) && renderedChildren
  }
}
