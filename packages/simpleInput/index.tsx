
import React from 'react'
import { classNames } from '../_utils/utils/global'
import './index.less'
import { InputEventHandler } from './PropTypes'

export interface SimpleInputProps {
  label?: string;
  value?: string;
  placeholder?: string,
  onInputFocus?: InputEventHandler
}

export class SimpleInput extends React.Component<SimpleInputProps, any> {
  static defaultProps = {
    label: '-',
    placeholder: '',
    onInputFocus: () => {}
  };

  constructor (props: SimpleInputProps) {
    super(props)
    const { value } = props
    this.state = {
      value: value
    }
  }

  static getDerivedStateFromProps (nextProps:SimpleInputProps, prevState:any) {
    if ('value' in nextProps) {
      return {
        ...prevState,
        value: nextProps.value
      }
    }
    return null
  }

  handleValueClick = (e:React.MouseEvent) => {
    const { onInputFocus } = this.props
    onInputFocus && onInputFocus(e)
  }

  render () {
    const { label, placeholder } = this.props
    const { value } = this.state
    return (
      <div className='x-input-item-container'>
        <div className='x-input-item_border_bottom x-mobile-border-bottom'>
          <div className='x-input-item-key'>
            {label}
          </div>
          <div onClick={this.handleValueClick} className={classNames([
            'x-input-item-value',
            {
              placeholder: !value
            }
          ])}>
            <div className='inner-value'>
              {value || placeholder}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
