import React from 'react'

export type MotionFps = {
  [key:string]: number
}

export type MotionChildren = {
  (obj:MotionFps): React.ReactNode
}

export type MotionAbstractClass = {
  motionStatus: string
}

export type TransitionClass = {
  currentStatus: string | null,
  nextCallback():void
}
export interface CommonCallback {
  (any?:any):any
}
