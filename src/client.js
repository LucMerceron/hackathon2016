import React from 'react'
import ReactDom from 'react-dom'
import routes from './routes'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

ReactDom.render(<Router history={createBrowserHistory()} children={routes}/>, document.getElementById('app'));