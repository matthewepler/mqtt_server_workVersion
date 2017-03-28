import React from 'react'
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom'

import MainContainer from '../containers/MainContainer'

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer} />
  </Router>
)

export default routes
