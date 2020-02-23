import React from 'react'
import ReactDom from 'react-dom'
import { CommonCallback } from './types'

const TransitionContext = React.createContext(null)
const ENTERED = 'entered'
const EXITED = 'exited'
const EXITING = 'exiting'
const ENTERING = 'entering'
const UNMOUNTED = 'unmounted'

interface TransitionProps {
  show: boolean,
  init?: boolean;
  timeout?: number,
  unmountOnExit?: boolean,
  onExiting?:CommonCallback,
  onExited?:CommonCallback,
  onEntering?:CommonCallback,
  onEntered?: CommonCallback,
  onEnter?:CommonCallback
}

export class Transition extends React.Component<TransitionProps, any> {
  nextCallback:any = () => {}

  constructor (props:TransitionProps) {
    super(props)
    let renderStatus:string = ''
    if (props.show) {
      renderStatus = ENTERED
    } else {
      if (props.unmountOnExit) {
        renderStatus = UNMOUNTED
      } else {
        renderStatus = EXITED
      }
    }

    this.state = {
      status: renderStatus
    }

    this.nextCallback = null
  }

  componentDidMount () {
    this.updateStatus(true, this.state.status)
  }

  // 获取到dom
  static getDerivedStateFromProps (prevProps:TransitionProps, prevState:any) {
    if (prevProps.show && prevState.status === UNMOUNTED) {
      return { status: EXITED }
    }
    return null
  }

  updateStatus (isFirstMounting:boolean = true, nextStatus:string) {
    const node = ReactDom.findDOMNode(this)
    if (isFirstMounting && this.props.show && this.props.init) {
      if (nextStatus === ENTERED) {
        this.excuteEnterProcess(node)
      }
    }
    if ((nextStatus === EXITED || nextStatus === UNMOUNTED) && (this.state.status === ENTERED || this.state.status === ENTERING)) { // 离开
      this.cancelNextCallback()
      this.excuteExitProcess(node, nextStatus === UNMOUNTED)
    } else if ((nextStatus === ENTERED) && (this.state.status === EXITED || this.state.status === UNMOUNTED || this.state.status === EXITING)) {
      this.cancelNextCallback()
      this.excuteEnterProcess(node)
    }
  }

  excuteExitProcess (div:any, isUnmounted:boolean = false) {
    this.safeSetState({ status: EXITING }, () => {
      this.props.onExiting && this.props.onExiting(div)

      this.excuteDelayCallback(div, this.props.timeout, () => {
        this.setState({ status: isUnmounted ? UNMOUNTED : EXITED }, () => {
          this.props.onExited && this.props.onExited(div)
        })
      })
    })
  }

  safeSetState (nextState:any, callback:CommonCallback) {
    callback = this.setNextCallback(callback)
    this.setState(nextState, callback)
  }

  excuteEnterProcess (div:any) {
    this.safeSetState({ status: ENTERING }, () => {
      this.props.onEntering && this.props.onEntering(div)

      this.excuteDelayCallback(div, this.props.timeout, () => {
        this.setState({ status: ENTERED }, () => {
          this.props.onEntered && this.props.onEntered(div)
        })
      })
    })
  }

  excuteDelayCallback = (node:HTMLElement, timeout:number | undefined, callback:CommonCallback) => {
    this.setNextCallback(callback)

    if (timeout !== undefined) {
      setTimeout(this.nextCallback, timeout)
    } else {
      this.nextCallback()
    }
  }

  cancelNextCallback () {
    if (this.nextCallback !== null) {
      this.nextCallback.cancle()
      this.nextCallback = null
    }
  }

  setNextCallback (callback:CommonCallback) {
    let flag:boolean = true
    this.nextCallback = () => {
      if (flag) {
        flag = false
        this.nextCallback = null
        callback()
      }
    }
    this.nextCallback.cancle = () => {
      flag = false
    }
    return this.nextCallback
  }

  componentDidUpdate (prevProps:TransitionProps) {
    if (prevProps.show !== this.props.show) {
      if (this.props.show) {
        this.updateStatus(false, ENTERED)
      } else {
        if (this.props.unmountOnExit) {
          this.updateStatus(false, UNMOUNTED)
        } else {
          this.updateStatus(false, EXITED)
        }
      }
    }
  }

  componentWillUnmount () {
    this.cancelNextCallback()
  }

  render () {
    const { status } = this.state
    if (status === UNMOUNTED) {
      return null
    }
    const { children, ...restProps } = this.props
    delete restProps.show
    delete restProps.unmountOnExit
    delete restProps.init
    delete restProps.timeout
    delete restProps.onEntering
    delete restProps.onEntered
    delete restProps.onExiting
    delete restProps.onExited
    if (typeof children === 'function') {
      return (
        <TransitionContext.Provider value={null}>
          {children(status, restProps)}
        </TransitionContext.Provider>)
    }
    // const child = React.Children.only(children)
    return (
      <TransitionContext.Provider value={null}>
        {children}
      </TransitionContext.Provider>
    )
  }
}
