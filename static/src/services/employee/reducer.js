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
const employee = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_EMPLOYEE_DATA_REQUEST':
        return Object.assign({}, state, {
            isFetching: true,
        });
    case 'RECEIVE_EMPLOYEE_DATA_SUCCESS':
        return Object.assign({}, state, {
            isFetching: false,
            isLoaded: true,
            employeeID: action.payload.employee.employeeID,
            permissionLevel: action.payload.employee.employeeID,
            active: action.payload.employee.active,
            deleted: action.payload.employee.deleted,
            createdTime: action.payload.employee.createdTime,
            updatedTime: action.payload.employee.updatedTime,
            terms: action.payload.employee.terms,
            termTime: action.payload.employee.termTime,
            privacy: action.payload.employee.privacy,
            privacyTime: action.payload.employee.privacyTime,
            mapAvatarImageUrl: action.payload.employee.mapAvatarImageUrl,
            thumbAvatarImageUrl: action.payload.employee.thumbAvatarImageUrl,
            userName: action.payload.employee.userName,
            firstName: action.payload.employee.firstName,
            lastName: action.payload.employee.lastName,
            email: action.payload.employee.email,
            phoneNumber: action.payload.employee.phoneNumber,
            followers: action.payload.employee.followers,
            following: action.payload.employee.following,
            merchantHash: action.payload.employee.merchantHash,
            signorAddress: action.payload.employee.signorAddress,
            isEther: action.payload.employee.isEther,
            posHash: action.payload.employee.posHash,
            apiKey: action.payload.employee.apiKey,
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

const employeeCode = (state = initialState, action) => {
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
            activationCode: action.payload.employeeCode.activationCode,
            establishmentID: action.payload.employeeCode.establishmentID,
            ownerName: action.payload.employeeCode.ownerName,
            establishmentName: action.payload.employeeCode.establishmentName,
            email: action.payload.employeeCode.email,
            permissionLevel: action.payload.employeeCode.permissionLevel,
            phoneNumber: action.payload.employeeCode.phoneNumber,
            valid: action.payload.employeeCode.valid,
            updatedTime: action.payload.employeeCode.updatedTime,
            createdTime: action.payload.employeeCode.createdTime,
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

const addEmployee = (state, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
          return {
            employeeID: action.employeeID,
            permissionLevel: action.employeeID,
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

const employees = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            if (state.map(employee => employee.key).includes(action.key)) {
              return [
                addEmployee(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addEmployee(undefined, action)
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

const addEmployeeCode = (state, action) => {
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

const employeeCodes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE_CODE':
            if (state.map(employeeCode => employeeCode.activationCode).includes(action.activationCode)) {
              return [
                addEmployeeCode(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addEmployeeCode(undefined, action)
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

const employeeData = combineReducers({
    employees,
    employee,
    receivedAt,
    employeeCodes,
    codesReceivedAt,
    employeeCode,
});

export default employeeData;
