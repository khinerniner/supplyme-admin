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
