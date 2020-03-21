import { combineReducers } from 'redux';

// Initial App State
//
// [START Initial App State]
const initialState = {
    isFetching: false,
    isLoaded: false,
    statusText: null,
};
// [END Initial App State]


// Create Firebase State Reducer
//
// [START Firebase State Reducer]
const valor = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_EMPLOYEE_DATA_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
        });
    case 'RECEIVE_EMPLOYEE_DATA_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
            isLoaded: true,
            valorID: action.payload.valor.valorID,
            permissionLevel: action.payload.valor.valorID,
            active: action.payload.valor.active,
            deleted: action.payload.valor.deleted,
            createdTime: action.payload.valor.createdTime,
            updatedTime: action.payload.valor.updatedTime,
            terms: action.payload.valor.terms,
            termTime: action.payload.valor.termTime,
            privacy: action.payload.valor.privacy,
            privacyTime: action.payload.valor.privacyTime,
            mapAvatarImageUrl: action.payload.valor.mapAvatarImageUrl,
            thumbAvatarImageUrl: action.payload.valor.thumbAvatarImageUrl,
            userName: action.payload.valor.userName,
            firstName: action.payload.valor.firstName,
            lastName: action.payload.valor.lastName,
            email: action.payload.valor.email,
            phoneNumber: action.payload.valor.phoneNumber,
            followers: action.payload.valor.followers,
            following: action.payload.valor.following,
            merchantHash: action.payload.valor.merchantHash,
            signorAddress: action.payload.valor.signorAddress,
            isEther: action.payload.valor.isEther,
            posHash: action.payload.valor.posHash,
            apiKey: action.payload.valor.apiKey,
        });
    case 'RECEIVE_EMPLOYEE_DATA_FAILURE':
        return Object.assign({}, state, {
            statusError: `Data Error: ${action.payload.status} ${action.payload.statusError}`,
            isFetching: false,
            isLoaded: false,
        });
    default:
        return state;
    }
};

const valorCode = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_EMPLOYEE_CODE_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
            isLoaded: false,
        });
    case 'RECEIVE_EMPLOYEE_CODE_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
            isLoaded: true,
            activationCode: action.payload.valorCode.activationCode,
            establishmentID: action.payload.valorCode.establishmentID,
            ownerName: action.payload.valorCode.ownerName,
            establishmentName: action.payload.valorCode.establishmentName,
            email: action.payload.valorCode.email,
            permissionLevel: action.payload.valorCode.permissionLevel,
            phoneNumber: action.payload.valorCode.phoneNumber,
            valid: action.payload.valorCode.valid,
            updatedTime: action.payload.valorCode.updatedTime,
            createdTime: action.payload.valorCode.createdTime,
        });
    case 'RECEIVE_EMPLOYEE_CODE_FAILURE':
        return Object.assign({}, state, {
            statusError: `Data Error: ${action.payload.status} ${action.payload.statusError}`,
            isFetching: false,
            isLoaded: false,
        });
    default:
        return state;
    }
};

const addValor = (state, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
          return {
            valorID: action.valorID,
            permissionLevel: action.valorID,
            active: action.active,
            deleted: action.deleted,
            createdTime: action.createdTime,
            updatedTime: action.updatedTime,
            terms: action.terms,
            termTime: action.termTime,
            privacy: action.privacy,
            privacyTime: action.privacyTime,
            mapAvatarImageUrl: action.mapAvatarImageUrl,
            thumbAvatarImageUrl: action.thumbAvatarImageUrl,
            userName: action.userName,
            firstName: action.firstName,
            lastName: action.lastName,
            email: action.email,
            phoneNumber: action.phoneNumber,
            followers: action.followers,
            following: action.following,
            merchantHash: action.merchantHash,
            signorAddress: action.signorAddress,
            isEther: action.isEther,
            posHash: action.posHash,
            apiKey: action.apiKey,
          }
        default:
            return state
    }
}

const valors = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            if (state.map(valor => valor.key).includes(action.key)) {
              return [
                addValor(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addValor(undefined, action)
                ]
            }
        default:
            return state
    }
};

const receivedAt = (state = null, action) => {
    switch (action.type) {
    case 'UNMOUNT_EMPLOYEES_LISTENER_REQUEST':
        return null;
    case 'START_FETCHING_EMPLOYEES':
        return state;
    case 'ADD_EMPLOYEE':
        return null;
    case 'RECEIVED_EMPLOYEES':
        return Date.now();

    default:
        return state;
    }
};

const addValorCode = (state, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE_CODE':
          return {
            activationCode: action.activationCode,
            establishmentID: action.establishmentID,
            ownerName: action.ownerName,
            establishmentName: action.establishmentName,
            email: action.email,
            permissionLevel: action.permissionLevel,
            phoneNumber: action.phoneNumber,
            valid: action.valid,
            updatedTime: action.updatedTime,
            createdTime: action.createdTime,
          }
        default:
            return state
    }
}

const valorCodes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE_CODE':
            if (state.map(valorCode => valorCode.activationCode).includes(action.activationCode)) {
              return [
                addValorCode(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addValorCode(undefined, action)
                ]
            }
        default:
            return state
    }
};

const codesReceivedAt = (state = null, action) => {
    switch (action.type) {
    case 'START_FETCHING_EMPLOYEE_CODES':
        return state;
    case 'ADD_EMPLOYEE_CODE':
        return null;
    case 'RECEIVED_EMPLOYEE_CODES':
        return Date.now();
    default:
        return state;
    }
};

const valorData = combineReducers({
    valors,
    valor,
    receivedAt,
    valorCodes,
    codesReceivedAt,
    valorCode,
});

export default valorData;
