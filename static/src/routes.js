/* eslint new-cap: 0 */

import React from 'react';
// using ES6 modules
import { Route, Switch, Redirect } from 'react-router-dom';

/* Public Containers */
import App from './containers/App';
import NotFoundView from './containers/Global/NotFoundView';
import LoginView from './containers/NotAuth/Register/LoginView';
import AccountRegisterView from './containers/NotAuth/Register/AccountRegisterView';

import ValorListView from './containers/NotAuth/Valor/ValorListView';
import ValorCreateView from './containers/NotAuth/Valor/ValorCreateView';

import LocationListView from './containers/VeriDoc/Location/LocationListView';
import LocationCreateView from './containers/VeriDoc/Location/LocationCreateView';

/* Public Components */
import { requireNoAuthentication } from './components/NotAuthenticatedComponent';
import { requireAuthentication } from './components/AuthenticatedComponent';

export default (
    <App>
        <Switch>
            // Auth Views
            <Route exact path="/" component={requireAuthentication(ValorListView)} />
            <Route exact path="/register" component={requireNoAuthentication(AccountRegisterView)} />
            <Route exact path="/login" component={requireNoAuthentication(LoginView)} />
            <Route exact path="/valor" component={requireNoAuthentication(ValorListView)} />
            <Route exact path="/valor/create" component={requireNoAuthentication(ValorCreateView)} />

            <Route exact path="/accounts/:id/dashboard" component={requireAuthentication(LocationListView)} />
            <Route exact path="/accounts/:id/locations" component={requireAuthentication(LocationListView)} />
            <Route exact path="/accounts/:id/locations/create" component={requireAuthentication(LocationCreateView)} />
            <Route component={NotFoundView} />
        </Switch>
    </App>
);
