/* eslint new-cap: 0 */

import React from 'react';
// using ES6 modules
import { Route, Switch, Redirect } from 'react-router-dom';

/* Public Containers */
import App from './containers/App';
import NotFoundView from './containers/Global/NotFoundView';
import LoginView from './containers/NotAuth/Register/LoginView';
import RegisterView from './containers/NotAuth/Register/RegisterView';
import HospitalRegisterView from './containers/NotAuth/Register/HospitalRegisterView';

import ValorListView from './containers/NotAuth/Valor/ValorListView';
import ValorCreateView from './containers/NotAuth/Valor/ValorCreateView';

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
            <Route exact path="/register/doctor" component={requireNoAuthentication(RegisterView)} />
            <Route exact path="/register/hospital" component={requireNoAuthentication(HospitalRegisterView)} />
            <Route exact path="/register/manufacture" component={requireNoAuthentication(RegisterView)} />
            <Route exact path="/login" component={requireNoAuthentication(LoginView)} />

            <Route exact path="/topics" component={requireAuthentication(TopicListView)} />
            <Route exact path="/topics/:id" component={requireAuthentication(TopicDetailView)} />
            
            <Route exact path="/valor" component={ValorListView} />
            <Route exact path="/valor/create" component={ValorCreateView} />
            <Route component={NotFoundView} />
        </Switch>
    </App>
);
