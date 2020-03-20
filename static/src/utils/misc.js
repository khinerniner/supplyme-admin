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


// Validation
export function validateVarChar(string) {
    if (typeof string === 'string' || string instanceof String && string !== null && string !== ''){
        return true;
    }
    return false;
}

export function validateKey(string) {
    const re = /^^(?!\.\.?$)(?!.*__.*__)([^/]{1,1500})$/;
    return re.test(string);
}

export function validateDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePhone(name) {
    const re = /^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(name);
}

export function validateString(string) {
    const re = /^[A-Za-z].*$/;
    return re.test(string);
}
export function validateNumber(string) {
    const re = /^[0-9].*$/;
    return re.test(string);
}

export function validateLocation(location) {
    const lat = location.lat;
    const lng = location.lng;
    if (!validateNumber(lat)) {
        console.error('Invalid Location Latitude');
        return false;
    }
    if (!validateNumber(lng)) {
        console.error('Invalid Location Longitude');
        return false;
    }
    return true
}
