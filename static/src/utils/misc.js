/* eslint max-len: 0, no-param-reassign: 0 */

import history from '../history';

// Dispatch Route with history
export function dispatchNewRoute(route) {
    history.push(route);
}

export function getRegistrationSearch(search) {
    if (!search) {
        return {
            code: null,
            type: null,
        }
    }
    const results = search.split('?').pop(-1);
    const _results = results.split('&');
    let code = null;
    let type = null;
    let error = null;
    _results.forEach((result) => {
        const key = result.split('=').shift();
        const value = result.split('=').pop();
        switch (key) {
            case 'code':
                code = value;
                break;
            case 'type':
                type = value;
                break;
            case 'error':
                error = value;
                break;
            default:
                break;
        }
    });
    return {
        code: code,
        type: type,
    }
}
