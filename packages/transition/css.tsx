import React from 'react'
import { Transition as T } from './machine'
import { CommonCallback } from './types'
interface CssTransitionProps {
  show?:boolean,
  timeout?: number,
  name: string,
  init?: boolean,
  unmountOnExit?: boolean,
  onEntering?: CommonCallback,
  onEntered?: CommonCallback,
  onExiting?: CommonCallback,
  onExited?: CommonCallback
}

export class CssTransition extends React.Component<CssTransitionProps, any> {
  enteringClassName:string = ''

  enterdClassName: string = ''

  exitingClassName: string = ''

  exitedClassName: string = ''

  initEnteringClassName: string = ''

  initEnterdClassName: string = ''

  currentAddClassName: string = ''

  constructor (props:CssTransitionProps) {
    super(props)
    const { name = '' } = this.props
    this.initEnteringClassName = `${name}-init-active`
    this.initEnterdClassName = `${name}-inited`
    this.enteringClassName = `${name}-enter-active`
    this.enterdClassName = `${name}-entered`
    this.exitingClassName = `${name}-exit-active`
    this.exitedClassName = `${name}-exited`
  }

  onEntering = (node:HTMLElement) => {
    this.removeClass(node, this.initEnteringClassName)
    this.removeClass(node, this.initEnterdClassName)
    this.removeClass(node, this.exitingClassName)
    this.removeClass(node, this.exitedClassName)
    node && node.scrollTop
    this.addClass(node, this.enteringClassName)
    this.props.onEntering && this.props.onEntering(node)
  }

  onEntered = (node:HTMLElement) => {
    this.removeClass(node, this.enteringClassName)
    this.addClass(node, this.enterdClassName)
    this.props.onEntered && this.props.onEntered(node)
  }

  onExiting = (node:HTMLElement) => {
    this.removeClass(node, this.enteringClassName)
    this.removeClass(node, this.enterdClassName)
    node && node.scrollTop
    this.addClass(node, this.exitingClassName)
    this.props.onExiting && this.props.onExiting(node)
  }

  onExited = (node:HTMLElement) => {
    this.removeClass(node, this.exitingClassName)
    this.addClass(node, this.exitedClassName)
    this.props.onExited && this.props.onExited(node)
  }

  addClass = (node:HTMLElement, classNames:string) => {
    !node.classList.contains(classNames) && node.classList.add(classNames)
  }

  removeClass = (node:HTMLElement, classNames:string) => {
    node.classList.contains(classNames) && node.classList.remove(classNames)
  }

  render () {
    const { name: _, show = true, children, ...otherProps } = this.props
    return (
      <T
        show={show}
        {...otherProps}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {children}
      </T>
    )
  }
}
