import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
	onAuthChange(!!Meteor.userId());
});

Meteor.startup(() => {
	Session.set('showVisible', true);
	ReactDOM.render(routes, document.getElementById('app'));
});
