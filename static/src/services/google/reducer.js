import { combineReducers } from 'redux';

const initialState = {
    analyticAccountId: null,
    analyticPropertyId: null,
    analyticProfileId: null,
    analyticActiveGoals: [],
    adsAccountId: null,
    placeData: [],
    isPlaceFetching: false,
    isPlaceLoaded: false,
    keywordData: [],
    isKeywordFetching: false,
    isKeywordLoaded: false,
    isFetching: false,
    isLoaded: false,
    statusText: null,
};

const google = (state = initialState, action) => {
    switch (action.type) {
    case 'GOOGLE_SAMY_LOGIN_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
        });
    case 'GOOGLE_SAMY_LOGIN_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
        });
    case 'GOOGLE_SAMY_LOGIN_FAILURE':
        return Object.assign({}, state, {
            statusText: `Data Error: ${action.payload.status} ${action.payload.statusText}`,
            isFetching: false,
        });
    case 'GOOGLE_SAMY_LOGOUT_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
        });
    case 'GOOGLE_SAMY_LOGOUT_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
        });
    case 'GOOGLE_SAMY_LOGOUT_FAILURE':
        return Object.assign({}, state, {
            statusText: `Data Error: ${action.payload.status} ${action.payload.statusText}`,
            isFetching: false,
        });
    case 'FETCH_GOOGLE_PLACES_REQUEST':
        return Object.assign({}, state, {
            isPlaceFetching: true,
            placeData: [],
            isPlaceLoaded: false,
        });
    case 'RECEIVE_GOOGLE_PLACES_SUCCESS':
        return Object.assign({}, state, {
            isPlaceFetching: false,
            isPlaceLoaded: true,
            placeData: action.places,
        });
    case 'RECEIVE_GOOGLE_PLACES_FAILURE':
        return Object.assign({}, state, {
            statusText: `Data Error: ${action.payload.status} ${action.payload.statusText}`,
            isPlaceFetching: false,
            isPlaceLoaded: false,
            placeData: [],
        });
    case 'FETCH_GOOGLE_KEYWORDS_REQUEST':
        return Object.assign({}, state, {
            isKeywordFetching: true,
            keywordData: [],
            isKeywordLoaded: false,
        });
    case 'RECEIVE_GOOGLE_KEYWORDS_SUCCESS':
        return Object.assign({}, state, {
            isKeywordFetching: false,
            isKeywordLoaded: true,
            keywordData: action.keywords,
        });
    case 'RECEIVE_GOOGLE_KEYWORDS_FAILURE':
        return Object.assign({}, state, {
            statusText: `Data Error: ${action.payload.status} ${action.payload.statusText}`,
            isKeywordFetching: false,
            isKeywordLoaded: false,
            keywordData: [],
        });

    default:
        return state;
    }
};

const googleData = combineReducers({
    google,
});

export default googleData;
