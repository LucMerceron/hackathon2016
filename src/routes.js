import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

module.exports = (
	<Route component={require('./components/App')} >
		<Route path="/" component={require('./components/Home')}>
			<Route path="test" component={require('./components/Test')}/>
		</Route>
	</Route>
);