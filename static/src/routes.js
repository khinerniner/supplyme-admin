/* eslint new-cap: 0 */

import React from 'react';
// using ES6 modules
import { Route, Switch, Redirect } from 'react-router-dom';

/* Public Containers */
import App from './containers/App';
import NotFoundView from './containers/Global/NotFoundView';
import LoginView from './containers/NotAuth/Register/LoginView';
import RegisterView from './containers/NotAuth/Register/RegisterView';

import TopicListView from './containers/VeriDoc/Home/TopicListView';
import TopicDetailView from './containers/VeriDoc/Home/TopicDetailView';

/* Public Components */
import { requireNoAuthentication } from './components/NotAuthenticatedComponent';
import { requireAuthentication } from './components/AuthenticatedComponent';

export default (
    <App>
        <Switch>
            // Auth Views
            <Route exact path="/" component={requireAuthentication(TopicListView)} />
            <Route exact path="/register" component={requireNoAuthentication(RegisterView)} />
            <Route exact path="/login" component={requireNoAuthentication(LoginView)} />

            <Route exact path="/topics" component={requireNoAuthentication(TopicListView)} />
            <Route exact path="/topics/:id" component={requireNoAuthentication(TopicDetailView)} />
            <Route component={NotFoundView} />
        </Switch>
    </App>
);
