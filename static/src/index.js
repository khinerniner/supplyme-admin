import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';

import configureStore from './store/configureStore';
import configureSignal from './store/configureSignal';
import routes from './routes';
import './style.scss';

const store = configureStore();
const signal = configureSignal();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
