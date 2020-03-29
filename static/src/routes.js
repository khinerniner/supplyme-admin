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
import PublicRequestMapView from './containers/VeriDoc/Request/PublicRequestMapView';

/* Private Containers */
import EmployeeListView from './containers/VeriDoc/Employee/EmployeeListView';
import EmployeeDetailView from './containers/VeriDoc/Employee/EmployeeDetailView';
import EmployeeCreateView from './containers/VeriDoc/Employee/EmployeeCreateView';
import EmployeeCodeListView from './containers/VeriDoc/Employee/EmployeeCodeListView';
import EmployeeCodeCreateView from './containers/VeriDoc/Employee/EmployeeCodeCreateView';
import LocationListView from './containers/VeriDoc/Location/LocationListView';
import LocationCreateView from './containers/VeriDoc/Location/LocationCreateView';
import RequestListView from './containers/VeriDoc/Request/RequestListView';
import PublicRequestListView from './containers/VeriDoc/Request/PublicRequestListView';
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
            <Route exact path="/" component={requireAuthentication(LocationListView)} />
            <Route exact path="/register" component={requireNoAuthentication(AccountRegisterView)} />
            <Route exact path="/login" component={requireNoAuthentication(LoginView)} />

            <Route exact path="/accounts/:id/account" component={requireAuthentication(LocationListView)} />
            <Route exact path="/accounts/:id/employees" component={requireAuthentication(EmployeeListView)} />
            <Route exact path="/accounts/:id/employees/codes" component={requireAuthentication(EmployeeCodeListView)} />
            <Route exact path="/accounts/:id/employees/:id" component={requireAuthentication(EmployeeDetailView)} />
            <Route exact path="/accounts/:id/employees/:id/edit" component={requireAuthentication(EmployeeCreateView)} />
            <Route exact path="/accounts/:id/employees/codes/create" component={requireAuthentication(EmployeeCodeCreateView)} />
            <Route exact path="/accounts/:id/locations" component={requireAuthentication(LocationListView)} />
            <Route exact path="/accounts/:id/locations/create" component={requireAuthentication(LocationCreateView)} />
            <Route exact path="/accounts/:id/requests" component={requireAuthentication(RequestListView)} />
            <Route exact path="/accounts/:id/requests/create" component={requireAuthentication(RequestCreateView)} />
            <Route exact path="/accounts/:id/menuItems" component={requireAuthentication(MenuItemListView)} />
            <Route exact path="/accounts/:id/menuItems/create" component={requireAuthentication(MenuItemCreateView)} />
            <Route exact path="/accounts/:id/orders" component={requireAuthentication(OrderListView)} />
            <Route exact path="/accounts/:id/orders/search" component={requireAuthentication(PublicRequestListView)} />
            <Route exact path="/accounts/:id/orders/create/requests/:id" component={requireAuthentication(OrderCreateView)} />

            <Route exact path="/map" component={requireNoAuthentication(PublicRequestMapView)} />
            <Route exact path="/valor" component={requireNoAuthentication(ValorListView)} />
            <Route exact path="/valor/create" component={requireNoAuthentication(ValorCreateView)} />
            <Route component={NotFoundView} />
        </Switch>
    </App>
);
