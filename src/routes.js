import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

module.exports = (
	<Route component={require('./components/App')} >
		<Route path="/" component={require('./components/Search')} />
    <Route path="result" component={require('./components/Results')}/>
    <Route path="link" component={require('./components/Relations')}/>
	</Route>
);