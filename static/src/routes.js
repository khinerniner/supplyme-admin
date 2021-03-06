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
import PublicRequestMapView from './containers/Xupply/Request/PublicRequestMapView';

/* Private Containers */
import EmployeeListView from './containers/Xupply/Employee/EmployeeListView';
import EmployeeDetailView from './containers/Xupply/Employee/EmployeeDetailView';
import EmployeeCreateView from './containers/Xupply/Employee/EmployeeCreateView';
import EmployeeCodeListView from './containers/Xupply/Employee/EmployeeCodeListView';
import EmployeeCodeCreateView from './containers/Xupply/Employee/EmployeeCodeCreateView';
import LocationListView from './containers/Xupply/Location/LocationListView';
import LocationDetailView from './containers/Xupply/Location/LocationDetailView';
import LocationCreateView from './containers/Xupply/Location/LocationCreateView';
import RequestListView from './containers/Xupply/Request/RequestListView';
import PublicRequestListView from './containers/Xupply/Request/PublicRequestListView';
import RequestCreateView from './containers/Xupply/Request/RequestCreateView';
import RequestDetailView from './containers/Xupply/Request/RequestDetailView';
import MenuItemListView from './containers/Xupply/MenuItem/MenuItemListView';
import MenuItemDetailView from './containers/Xupply/MenuItem/MenuItemDetailView';
import MenuItemCreateView from './containers/Xupply/MenuItem/MenuItemCreateView';
import OrderListView from './containers/Xupply/Order/OrderListView';
import OrderCreateView from './containers/Xupply/Order/OrderCreateView';
import OrderDetailView from './containers/Xupply/Order/OrderDetailView';
import OpportunityListView from './containers/Xupply/Opportunity/OpportunityListView';
import OpportunityCreateView from './containers/Xupply/Opportunity/OpportunityCreateView';

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
            <Route exact path="/accounts/:id/locations/:id" component={requireAuthentication(LocationDetailView)} />
            <Route exact path="/accounts/:id/locations/:id/edit" component={requireAuthentication(LocationCreateView)} />
            <Route exact path="/accounts/:id/requests" component={requireAuthentication(RequestListView)} />
            <Route exact path="/accounts/:id/requests/create" component={requireAuthentication(RequestCreateView)} />
            <Route exact path="/accounts/:id/requests/:id" component={requireAuthentication(RequestDetailView)} />
            <Route exact path="/accounts/:id/menuItems" component={requireAuthentication(MenuItemListView)} />
            <Route exact path="/accounts/:id/menuItems/create" component={requireAuthentication(MenuItemCreateView)} />
            <Route exact path="/accounts/:id/menuItems/:id" component={requireAuthentication(MenuItemDetailView)} />
            <Route exact path="/accounts/:id/menuItems/:id/edit" component={requireAuthentication(MenuItemCreateView)} />
            <Route exact path="/accounts/:id/orders" component={requireAuthentication(OrderListView)} />
            <Route exact path="/accounts/:id/orders/search" component={requireAuthentication(PublicRequestListView)} />
            <Route exact path="/accounts/:id/orders/create/requests/:id" component={requireAuthentication(OrderCreateView)} />
            <Route exact path="/accounts/:id/orders/:id" component={requireAuthentication(OrderDetailView)} />
            <Route exact path="/accounts/:id/opportunities" component={requireAuthentication(OpportunityListView)} />
            <Route exact path="/accounts/:id/opportunities/create/requests/:id" component={requireAuthentication(OpportunityCreateView)} />

            <Route exact path="/map" component={requireNoAuthentication(PublicRequestMapView)} />
            <Route exact path="/valor" component={requireNoAuthentication(ValorListView)} />
            <Route exact path="/valor/create" component={requireNoAuthentication(ValorCreateView)} />
            <Route component={NotFoundView} />
        </Switch>
    </App>
);
