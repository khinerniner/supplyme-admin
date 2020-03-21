import { combineReducers } from 'redux';
import { parseFirestoreTimeStamp } from '../../utils/misc';

// Initial App State
//
// [START Initial App State]
const initialState = {
    isFetching: false,
    isLoaded: false,
    isPOSMigrating: false,
    isPOSMigrated: false,
    isMerchantCreating: false,
    isMerchantCreated: false,
    statusText: null,
};
// [END Initial App State]


// Create Firebase State Reducer
//
// [START Firebase State Reducer]
const hospital = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_HOSPITAL_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
        });
    case 'RECEIVE_HOSPITAL_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
            isLoaded: true,
            hospitalID: action.payload.hospital.hospitalID,
            active: action.payload.hospital.active,
            deleted: action.payload.hospital.deleted,
            createdTime: parseFirestoreTimeStamp(action.payload.hospital.createdTime),
            updatedTime: parseFirestoreTimeStamp(action.payload.hospital.updatedTime),
            name: action.payload.hospital.name,
            email: action.payload.hospital.email,
            phoneNumber: action.payload.hospital.phoneNumber,
            requestCount: action.payload.hospital.requestCount,
            address: action.payload.hospital.address,
            timezone: action.payload.hospital.timezone,
            website: action.payload.hospital.website,
            occupancy: action.payload.hospital.occupancy,
            pos: action.payload.hospital.pos,
            merchants: action.payload.hospital.merchants,
        });
    case 'RECEIVE_HOSPITAL_FAILURE':
        return Object.assign({}, state, {
            statusError: `Data Error: ${action.payload.status} ${action.payload.statusError}`,
            isFetching: false,
            isLoaded: false,
        });
    case 'MIGRATE_POS_REQUEST':
        return Object.assign({}, state, {
            isPOSMigrating: true,
            isPOSMigrated: false,
        });
    case 'MIGRATE_POS_SUCCESS':
        return Object.assign({}, state, {
            isPOSMigrating: false,
            isPOSMigrated: true,
            pos: action.payload.pos,
        });
    case 'MIGRATE_POS_FAILURE':
        return Object.assign({}, state, {
            statusText: `Data Error: ${action.payload.status} ${action.payload.statusText}`,
            isPOSMigrating: false,
            isPOSMigrated: false,
        });
    case 'CREATE_MERCHANT_CUSTOMER_REQUEST':
        return Object.assign({}, state, {
            isMerchantCreating: true,
            isMerchantCreated: false,
        });
    case 'CREATE_MERCHANT_CUSTOMER_SUCCESS':
        return Object.assign({}, state, {
            isMerchantCreating: false,
            isMerchantCreated: true,
        });
    case 'CREATE_MERCHANT_CUSTOMER_FAILURE':
        return Object.assign({}, state, {
            statusText: `Data Error: ${action.payload.status} ${action.payload.statusText}`,
            isMerchantCreating: false,
            isMerchantCreated: false,
        });
    default:
        return state;
    }
};

const hospitalCode = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_HOSPITAL_CODE_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
            isLoaded: false,
        });
    case 'RECEIVE_HOSPITAL_CODE_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
            isLoaded: true,
            activationCode: action.payload.hospitalCode.activationCode,
            accountID: action.payload.hospitalCode.accountID,
            accountType: action.payload.hospitalCode.accountType,
            ownerName: action.payload.hospitalCode.ownerName,
            hospitalName: action.payload.hospitalCode.hospitalName,
            email: action.payload.hospitalCode.email,
            phoneNumber: action.payload.hospitalCode.phoneNumber,
            valid: action.payload.hospitalCode.valid,
            updatedTime: action.payload.hospitalCode.updatedTime,
            createdTime: action.payload.hospitalCode.createdTime,
        });
    case 'RECEIVE_HOSPITAL_CODE_FAILURE':
        return Object.assign({}, state, {
            statusError: `Data Error: ${action.payload.status} ${action.payload.statusError}`,
            isFetching: false,
            isLoaded: false,
        });
    default:
        return state;
    }
};


const addHospital = (state, action) => {
    switch (action.type) {
        case 'ADD_HOSPITAL':
          return {
            hospitalID: action.hospitalID,
            active: action.active,
            deleted: action.deleted,
            createdTime: parseFirestoreTimeStamp(action.createdTime),
            updatedTime: parseFirestoreTimeStamp(action.updatedTime),
            name: action.name,
            email: action.email,
            phoneNumber: action.phoneNumber,
            requestCount: action.requestCount,
            address: action.address,
            timezone: action.timezone,
            website: action.website,
            occupancy: action.occupancy,
            pos: action.pos,
            merchants: action.merchants,
          }
        default:
            return state
    }
}



const hospitals = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HOSPITAL':
            if (state.map(hospital => hospital.hospitalID).includes(action.hospitalID)) {
              return [
                addHospital(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addHospital(undefined, action)
                ]
            }
        default:
            return state
    }
};

const receivedAt = (state = null, action) => {
    switch (action.type) {
    case 'UNMOUNT_HOSPITALS_LISTENER_REQUEST':
        return null;
    case 'START_FETCHING_HOSPITALS':
        return state;
    case 'ADD_HOSPITAL':
        return null;
    case 'RECEIVED_HOSPITALS':
        return Date.now();

    default:
        return state;
    }
};

const addHospitalCode = (state, action) => {
    switch (action.type) {
        case 'ADD_HOSPITAL_CODE':
          return {
            activationCode: action.activationCode,
            accountID: action.accountID,
            accountType: action.accountType,
            ownerName: action.ownerName,
            hospitalName: action.hospitalName,
            email: action.email,
            phoneNumber: action.phoneNumber,
            valid: action.valid,
            updatedTime: action.updatedTime,
            createdTime: action.createdTime,
          }
        default:
            return state
    }
}

const hospitalCodes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HOSPITAL_CODE':
            if (state.map(hospitalCode => hospitalCode.activationCode).includes(action.activationCode)) {
              return [
                addHospitalCode(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addHospitalCode(undefined, action)
                ]
            }
        default:
            return state
    }
};

const codesReceivedAt = (state = null, action) => {
    switch (action.type) {
    case 'START_FETCHING_HOSPITAL_CODES':
        return state;
    case 'ADD_HOSPITAL_CODE':
        return null;
    case 'RECEIVED_HOSPITAL_CODES':
        return Date.now();
    default:
        return state;
    }
};


const hospitalData = combineReducers({
    hospitals,
    receivedAt,
    hospital,
    hospitalCodes,
    codesReceivedAt,
    hospitalCode,
});

export default hospitalData;
