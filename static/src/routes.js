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
import RequestListView from './containers/VeriDoc/Request/RequestListView';
import RequestCreateView from './containers/VeriDoc/Request/RequestCreateView';
import MenuItemListView from './containers/VeriDoc/MenuItem/MenuItemListView';
import MenuItemCreateView from './containers/VeriDoc/MenuItem/MenuItemCreateView';
import OrderListView from './containers/VeriDoc/Order/OrderListView';
import OrderCreateView from './containers/VeriDoc/Order/OrderCreateView';

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

            <Route exact path="/accounts/:id/account" component={requireAuthentication(LocationListView)} />
            <Route exact path="/accounts/:id/locations" component={requireAuthentication(LocationListView)} />
            <Route exact path="/accounts/:id/locations/create" component={requireAuthentication(LocationCreateView)} />
            <Route exact path="/accounts/:id/requests" component={requireAuthentication(RequestListView)} />
            <Route exact path="/accounts/:id/requests/create" component={requireAuthentication(RequestCreateView)} />
            <Route exact path="/accounts/:id/menuItems" component={requireAuthentication(MenuItemListView)} />
            <Route exact path="/accounts/:id/menuItems/create" component={requireAuthentication(MenuItemCreateView)} />
            <Route exact path="/accounts/:id/orders" component={requireAuthentication(OrderListView)} />
            <Route exact path="/accounts/:id/orders/create" component={requireAuthentication(OrderCreateView)} />
            <Route component={NotFoundView} />
        </Switch>
    </App>
);
