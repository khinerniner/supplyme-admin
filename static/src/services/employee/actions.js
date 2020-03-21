import history from '../../history';
import { db } from '../../store/firebase';
import { parseJSON } from '../../utils/misc';
import { apiActivateEmployeeCode } from '../../utils/http_functions';
import { toNewEmployee } from './model';

export const addEmployee = employee => ({
    type: 'ADD_EMPLOYEE',
    ...employee,
});

export const startFetchingEmployees = () => ({
    type: 'START_FETCHING_EMPLOYEES',
});

export const receivedEmployees = () => ({
    type: 'RECEIVED_EMPLOYEES',
    receivedAt: Date.now(),
});
export const receiveEmployees = querySnapshot => (dispatch) => {
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            const employee = doc.data();
            employee.employeeID = doc.id;
            dispatch(addEmployee(employee));
        });
        dispatch(receivedEmployees());
    }
};

export const fetchEmployees = (establishmentID) =>  (dispatch) => {
    dispatch(startFetchingEmployees());
    db()
        .collection('Establishments')
        .doc(establishmentID)
        .collection('Employees')
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const employees = querySnapshot || [];
                dispatch(receiveEmployees(employees));
            }, 0);
        }, (error) => {
            console.log(error);
        });
};

// Get Employee Data
//
// [START Get Employee Data]
export const getEmployeeRequest = () => ({
    type: 'FETCH_EMPLOYEE_REQUEST',
});


export const getEmployeeSuccess = (key, employee) => ({
    type: 'RECEIVE_EMPLOYEE_SUCCESS',
    payload: {
        key,
        employee,
    },
});

export const getEmployeeFailure = error => ({
    type: 'RECEIVE_EMPLOYEE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const getEmployee = (establishmentID, employeeID) => (dispatch) => {
    dispatch(getEmployeeRequest());
    console.error(establishmentID)
    console.log(employeeID)
    const establishmentRef = db().collection('Establishments').doc(establishmentID);
    const employeeRef = establishmentRef.collection('Employees').doc(employeeID);
    employeeRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Employee data:', doc.data());
            const key = doc.id;
            const value = doc.data();
            dispatch(getEmployeeSuccess(key, value));
        } else {
            console.log('No such employee document!');
            dispatch(getEmployeeFailure({
                response: {
                    status: 400,
                    statusText: 'No Employee Account',
                },
            }));
        }
    });
};
// [END Get Employee Data]

// Save New Employee
//
// [START Save New Employee]
export const saveNewEmployeeRequest = () => ({
    type: 'SAVE_NEW_EMPLOYEE_REQUEST',
});


export const saveNewEmployeeSuccess = () => ({
    type: 'SAVE_NEW_EMPLOYEE_SUCCESS',
});

export const saveNewEmployeeFailure = error => ({
    type: 'SAVE_NEW_EMPLOYEE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const saveNewEmployee = (token, employeeCodeInfo, redirectRoute) => (dispatch) => {
    dispatch(saveNewEmployeeRequest());
    console.log(token)
    console.log(employeeCodeInfo)
    console.log(redirectRoute)

    const establishmentID = employeeCodeInfo.establishmentID;

    const employmentDate = new Date()

    const newEmployeeCodeDocRef = db().collection("EmployeeActivationCodes").doc();
    const newTempEstablishmentEmployeeRef = db().collection("Establishments").doc(establishmentID).collection("Employees").doc(newEmployeeCodeDocRef.id)

    const employeeID = newEmployeeCodeDocRef.id;
    const employee = toNewEmployee();
    employee.active = true
    const newName = employeeCodeInfo.ownerName.split(' ')
    employee.firstName = newName[0]
    employee.lastName = newName[1]
    employee.email = employeeCodeInfo.email;
    employee.activationCode = newEmployeeCodeDocRef.id
    employee.createdTime = employmentDate
    employee.updatedTime = employmentDate
    employee.employeeID = employeeID;

    employeeCodeInfo.activationCode = employee.activationCode
    employeeCodeInfo.createdTime = employmentDate
    employeeCodeInfo.updatedTime = employmentDate

    console.warn(employee)
    console.warn(employeeCodeInfo)

    return db().runTransaction((transaction) => {
      transaction.set(newEmployeeCodeDocRef, employeeCodeInfo);
      transaction.set(newTempEstablishmentEmployeeRef, employee);
      return Promise.resolve({ employeeID, establishmentID });
    }).then((employeeID, establishmentID) => {
        console.log("Transaction successfully committed!");
        dispatch(saveNewEmployeeSuccess());
        dispatch(activateEmployeeCode(token, employeeCodeInfo))
        // Analytics
        history.back();
    }).catch((error) => {
        console.log("Transaction failed: ", error);
        dispatch(saveNewEmployeeFailure({
            response: {
                status: 999,
                statusText: error.message,
            },
        }));
    });
};
// [END Save New Employee]

export const addEmployeeCode = employeeCode => ({
    type: 'ADD_EMPLOYEE_CODE',
    ...employeeCode,
});

export const startFetchingEmployeeCodes = () => ({
    type: 'START_FETCHING_EMPLOYEE_CODES',
});

export const receivedEmployeeCodes = () => ({
    type: 'RECEIVED_EMPLOYEE_CODES',
    receivedAt: Date.now(),
});
export const receiveEmployeeCodes = querySnapshot => function (dispatch) {
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            const employeeCode = doc.data();
            employeeCode.activationCode = doc.id;
            dispatch(addEmployeeCode(employeeCode));
        });
        dispatch(receivedEmployeeCodes());
    }
};

export const fetchEmployeeCodes = (establishmentID) => function (dispatch) {
    dispatch(startFetchingEmployeeCodes());
    db()
        .collection('EmployeeActivationCodes').where('establishmentID', '==', establishmentID)
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const employeeCodes = querySnapshot || [];
                dispatch(receiveEmployeeCodes(employeeCodes));
            }, 0);
        }, (error) => {
            console.log(error);
            // Handle Error
        });
};

// Get Employee Code
//
// [START Get Employee Code]
export const getEmployeeCodeRequest = () => ({
    type: 'FETCH_EMPLOYEE_CODE_REQUEST',
});


export const getEmployeeCodeSuccess = (employeeCode) => ({
    type: 'RECEIVE_EMPLOYEE_CODE_SUCCESS',
    payload: {
        employeeCode,
    },
});

export const getEmployeeCodeFailure = error => ({
    type: 'RECEIVE_EMPLOYEE_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const getEmployeeCode = activationCode => (dispatch) => {
    dispatch(getEmployeeCodeRequest());
    const employeeCodeRef = db().collection('EmployeeActivationCodes').doc(activationCode);
    employeeCodeRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Employee Code data:', doc.data());
            const employeeCode = doc.data();
            employeeCode.activationCode = doc.id;
            dispatch(getEmployeeCodeSuccess(employeeCode));
        } else {
            console.log('No such Employee Code document!');
            dispatch(getEmployeeCodeFailure({
                response: {
                    status: 400,
                    statusText: 'No Employee Account',
                },
            }));
        }
    });
};
// [END Get Employee Code]

// Activate Employee Code
// TODO: None
// [START Activate Employee Code]
export const activateEmployeeCodeRequest = () => ({
    type: 'ACTIVATE_EMPLOYEE_CODE_REQUEST',
});

export const activateEmployeeCodeSuccess = () => ({
    type: 'ACTIVATE_EMPLOYEE_CODE_SUCCESS',
});

export const activateEmployeeCodeFailure = error => ({
    type: 'ACTIVATE_EMPLOYEE_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const activateEmployeeCode = (token, employeeCode) => (dispatch) => {
        dispatch(activateEmployeeCodeRequest());
        db().collection('EmployeeActivationCodes').doc(employeeCode.activationCode).update({
            valid: true,
        }).then((response) => {
          return apiActivateEmployeeCode(token, employeeCode)
          .then(parseJSON)
              .then((response) => {
                  dispatch(activateEmployeeCodeSuccess());

                  // Add Analytics
                  // Add Swal Alert
              })
              .catch((error) => {
                  // Add Analytics
                  dispatch(activateEmployeeCodeFailure({
                      response: {
                          status: error.response.status,
                          statusText: error.response.data.statusText,
                      },
                  }));
              });
        }).catch((error) => {
            // Add Analytics
            dispatch(activateEmployeeCodeFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Activate Employee Code]

// Deactivate Employee Code
// TODO: None
// [START Deactivate Employee Code]
export const deactivateEmployeeCodeRequest = () => ({
    type: 'DEACTIVATE_EMPLOYEE_CODE_REQUEST',
});

export const deactivateEmployeeCodeSuccess = () => ({
    type: 'DEACTIVATE_EMPLOYEE_CODE_SUCCESS',
});

export const deactivateEmployeeCodeFailure = error => ({
    type: 'DEACTIVATE_EMPLOYEE_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const deactivateEmployeeCode = (token, employeeCode) => (dispatch) => {
    console.log(employeeCode)
        dispatch(deactivateEmployeeCodeRequest());
        db().collection('EmployeeActivationCodes').doc(employeeCode.activationCode).update({
            valid: false,
        }).then((response) => {
            // Add Analytics
            // Add Alert
            dispatch(deactivateEmployeeCodeSuccess());
        }).catch((error) => {
            // Add Analytics
            dispatch(deactivateEmployeeCodeFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Deactivate Employee Code]
