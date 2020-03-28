/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = token => ({
    headers: {
        Authorization: token,
    },
});

const dataUploadConfig = token => ({
    headers: {
        Authorization: token,
        'content-type': 'multipart/form-data',
    },
});

// Activate Account Code Endpoint
// TODO: None
// [START Activate Account Code Endpoint]
export function apiSendEmailAccountCode(token, activationCode) {
    return axios.post('/api/google/v1/account/activationCode/send', {
        activationCode,
    }, tokenConfig(token));
}
// [END Activate Account Code Endpoint]

// Registration Account Email Endpoint
// TODO: None
// [START Registration Account Email Endpoint]
export function apiSendEmailRegisteredAccount(token, activationCode) {
    return axios.post('/api/google/v1/account/registration/send', {
        activationCode,
    }, tokenConfig(token));
}
// [END Registration Account Email Endpoint]

// Activate Employee Code Endpoint
// TODO: None
// [START Activate Employee Code Endpoint]
export function apiSendEmailEmployeeCode(token, activationCode) {
    return axios.post('/api/google/v1/employee/activationCode/send', {
        activationCode,
    }, tokenConfig(token));
}
// [END Activate Employee Code Endpoint]

// Search Google Places
// TODO: None
// [START Search Google Places]
export function apiSearchGooglePlaces(query, type) {
    return axios.get('/api/google/v1/places/search', {
        params: {
            query,
            type,
        },
    });
}
// [END Search Google Places]

// Geocode Google Place
// TODO: None
// [START Geocode Google Place]
export function apiGeocodeGooglePlace(token, accountID, place) {
    return axios.get('/api/google/v1/places/geocode', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            accountID,
            place,
        },
    });
}
// [END Geocode Google Place]
