import React, { Component } from 'react'
import { SimpleInput, Select } from '@pack/index.ts'

export default class index extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = {
      form: {
        marriage: '',
        profession: ''
      },
      isScrollboxShow: false
    }
  }

  handleSimpleInputClick = ():void => {
    this.setState({
      isScrollboxShow: !this.state.isScrollboxShow
    })
  }

  render () {
    const { form, isScrollboxShow } = this.state
    return <div className='input-container'>
      <SimpleInput
        label='婚姻状况'
        value={form.marriage}
        placeholder='请选择'
        onInputFocus={this.handleSimpleInputClick}
      />
      <SimpleInput
        label='职业信息'
        value={form.profession}
        placeholder='请选择'
      />
      <Select
        isShow={isScrollboxShow}
        onMaskClick={this.handleSimpleInputClick}
      />
    </div>
  }
}
