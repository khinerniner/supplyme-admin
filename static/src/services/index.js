import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { LOGOUT_USER } from '../constants/index';

/* Admin Reducer Files */
import app from './app/reducer';
import accountData from './account/reducer';

const appReducer = history => combineReducers({
    router: connectRouter(history),
    app,
    accountData,
});

export const rootReducer = history => (state, action) => {
    if (action.type === LOGOUT_USER) {
        state = undefined;
    }
    return appReducer(history, state, action);
};

export default appReducer;
