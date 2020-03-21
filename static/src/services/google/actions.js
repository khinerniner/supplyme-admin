import {
    apiSearchGooglePlaces,
    apiGeocodeGooglePlace,
} from '../../utils/http_functions';

import { errorAlert } from '../../utils/alerts';
// import { veridocAnalytic } from '../../utils/analytics';
import { parseJSON } from '../../utils/misc';

// Search Google Hospitals
// TODO: None
// [START Search Google Hospitals]
export const googleHospitalsRequest = () => ({
    type: 'FETCH_GOOGLE_PLACES_REQUEST',
});

export const googleHospitalsSuccess = places => ({
    type: 'RECEIVE_GOOGLE_PLACES_SUCCESS',
    places,
});

export const googleHospitalsFailure = error => ({
    type: 'RECEIVE_GOOGLE_PLACES_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const searchGoogleHospitals = (query) => (dispatch) => {
    dispatch(googleHospitalsRequest());
    return apiSearchGooglePlaces(query, 'hospital')
        .then(parseJSON)
        .then((response) => {
            console.log(response)
            // veridocAnalytic('google_places_success', null);
            dispatch(googleHospitalsSuccess(response.data.data));
        })
        .catch((error) => {
            console.log(error);
            errorAlert(error.response.data.statusText);
            samyAnalytic('google_places_failure', null);
            dispatch(googleHospitalsFailure({
                response: {
                    status: 403,
                    statusText: 'User with that email already exists',
                },
            }));
        });
};
// [END Search Google Hospitals]

// Geocode Google Hospital
// TODO: None
// [START Geocode Google Hospital]
export const geocodeGoogleHospital = (token, dispensaryID, place) => {
    return apiGeocodeGooglePlace(token, dispensaryID, place)
        .then(parseJSON)
        .then((response) => {
            console.log(response.data);
            samyAnalytic('geocode_places_success');
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            errorAlert(error.response.data.statusText);
            samyAnalytic('geocode_places_failure');
        });
};
// [END Geocode Google Hospital]

// Shrink Google Link
// TODO: None
// [START Shrink Google Link]
export const shrinkGoogleLink = (token, url, source, campaign, medium) => {
    return apiShrinkGoogleLink(token, url, source, campaign, medium)
        .then(parseJSON)
        .then((response) => {
            console.log(response.data);
            samyAnalytic('shrink_link_success');
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            errorAlert(error.response.data.statusText);
            samyAnalytic('shrink_link_failure');
        });
};
// [END Shrink Google Link]

// Search Google Keywords
// TODO: None
// [START Search Google Keywords]
export const googleKeywordsRequest = () => ({
    type: 'FETCH_GOOGLE_KEYWORDS_REQUEST',
});

export const googleKeywordsSuccess = keywords => ({
    type: 'RECEIVE_GOOGLE_KEYWORDS_SUCCESS',
    keywords,
});

export const googleKeywordsFailure = error => ({
    type: 'RECEIVE_GOOGLE_KEYWORDS_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const searchGoogleKeywords = (token, employeeID, accountID, query) => (dispatch) => {
    dispatch(googleKeywordsRequest());
    return apiSearchGoogleKeywords(token, accountID, query)
        .then(parseJSON)
        .then((response) => {
            console.log(response.data);
            samyAnalytic('google_places_success', null);
            dispatch(googleKeywordsSuccess(response.data));
        })
        .catch((error) => {
            console.log(error);
            errorAlert(error.response.data.statusText);
            samyAnalytic('google_keyword_failure', null);
            dispatch(googleKeywordsFailure({
                response: {
                    status: 403,
                    statusText: 'Failed to get keywords',
                },
            }));
        });
};
// [END Search Google Keywords]
