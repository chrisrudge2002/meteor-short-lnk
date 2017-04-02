import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Link from '../ui/Link';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';

const authenticatedPages = ['/links'];
const unauthenticatedPages = ['/', '/signup'];

const onEnterPublicPage = () => {
	if (Meteor.userId()) { browserHistory.replace('/links'); }
};

const onEnterPrivatePage = () => {
	if (!Meteor.userId()) { browserHistory.replace('/'); }
};

export const onAuthChange = isAuthenticated => {
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);

	if (isAuthenticatedPage && !isAuthenticated) {
		browserHistory.replace('/');
	} else if (isUnauthenticatedPage && isAuthenticated) {
		browserHistory.replace('/links');
	}
};

export const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} onEnter={onEnterPublicPage}/>
		<Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
		<Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
		<Route path="*" component={NotFound}/>
	</Router>
);

