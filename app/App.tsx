import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './assets/styles/index.less'

import RoutesMap from '@app/routes'
// import Input from '@pack/Input'
export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        {RoutesMap.map((routes, index) => {
          return (
            <Route
              key={index}
              exact={routes.exact}
              path={routes.path}
              component={routes.component}
            />
          )
        })}
      </BrowserRouter>
    )
  }
}
