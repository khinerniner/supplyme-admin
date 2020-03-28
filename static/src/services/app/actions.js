// import { Cookies } from 'react-cookie-banner';
import history from '../../history';
import { auth, db } from '../../store/firebase';
import { parseJSON } from '../../utils/misc';
import { errorAlert, successAlert } from '../../utils/alerts';
import { getAccount } from '../../services/account/actions';

// For AppItems in Swift
import { fetchEmployees } from '../../services/employee/actions';
import { fetchLocations } from '../../services/location/actions';
import { fetchRequests } from '../../services/request/actions';
import { fetchPublicRequests } from '../../services/request/actions';
import { fetchMenuItems } from '../../services/menuItem/actions';
import { fetchOrders } from '../../services/order/actions';

// Login Employee
//
// [START Login Employee]
export const loginEmployeeRequest = () => ({
    type: 'LOGIN_EMPLOYEE_REQUEST',
});


export const loginEmployeeSuccess = (employeeID, accountID, accountType, employee, idToken) => ({
    type: 'LOGIN_EMPLOYEE_SUCCESS',
    payload: {
        employeeID,
        accountID,
        accountType,
        employee,
        idToken,
    },
});


export const loginEmployeeFailure = error => ({
    type: 'LOGIN_EMPLOYEE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const loginEmployeeWithPermissions = (employeeID, redirectRoute) => (dispatch) => {
  try {
    console.log('User ID: ' + employeeID)
    const refresh = true;
    auth().currentUser.getIdToken(refresh).then((idToken) => {
        console.error(idToken)
        const userRef = db().collection('MasterUserList').doc(employeeID);
        userRef.get().then((userDoc) => {
            if (userDoc.exists) {
                console.log('Account ID' + userDoc.data().accountID);
                const accountID = userDoc.data().accountID;
                const accountType = userDoc.data().accountType;
                const accountRef = db().collection('Accounts').doc(accountID);
                accountRef.collection('Employees').doc(employeeID).get().then((empDoc) => {
                    if (empDoc.exists) {
                        console.log('Permission Level:', empDoc.data().permissionLevel);
                        const permissionLevel = empDoc.data().permissionLevel;
                        if (permissionLevel === 'deleted') {
                          console.log('Employee document deleted!');
                          dispatch(loginEmployeeFailure({
                              response: {
                                  status: 999,
                                  statusText: 'Employee Account Deleted',
                              },
                          }));
                        }
                        localStorage.setItem('idToken', idToken);
                        dispatch(getAccount(accountID));
                        dispatch(fetchEmployees(employeeID, accountID));
                        dispatch(fetchLocations(employeeID, accountID));
                        dispatch(fetchRequests(employeeID, accountID));
                        dispatch(fetchPublicRequests(employeeID, accountID));
                        dispatch(fetchMenuItems(employeeID, accountID));
                        dispatch(fetchOrders(employeeID, accountID));
                        dispatch(loginEmployeeSuccess(employeeID, accountID, accountType, empDoc.data(), idToken));
                        // NO "/" because of redirect starting with "/"
                        history.push(redirectRoute);
                    } else {
                        console.log('No such Employee document!');
                        dispatch(loginEmployeeFailure({
                            response: {
                                status: 999,
                                statusText: 'No Employee Account',
                            },
                        }));
                    }
                })
                .catch((error) => {
                  console.log('Employee Ref Error: ' + error.message);
                  dispatch(loginEmployeeFailure({
                      response: {
                          status: 999,
                          statusText: error.message,
                      },
                  }));
                })
            } else {
                console.log('No such User document');
                dispatch(logoutAndRedirect());
                dispatch(loginEmployeeFailure({
                    response: {
                        status: 999,
                        statusText: 'No User Account',
                    },
                }));
            }
        })
        .catch((error) => {
          console.log('User Ref Error: ' + error.message);
          dispatch(loginEmployeeFailure({
              response: {
                  status: 999,
                  statusText: error.message,
              },
          }));
        })
    });
  } catch (error) {
      console.log('Auth Ref Error: ' + error);
      dispatch(logoutEmployeeFailure({
          response: {
              status: 999,
              statusText: error.message,
          },
      }));
  }
}

export const loginEmployee = (email, password, redirectRoute) => (dispatch) => {
    dispatch(loginEmployeeRequest());
    return auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (user) {
                try {
                    dispatch(loginEmployeeWithPermissions(user.user.uid, redirectRoute))
                } catch (error) {
                    dispatch(loginEmployeeFailure({
                        response: {
                            status: 999,
                            statusText: error.message,
                        },
                    }));
                }

            }
        })
        .catch((error) => {
            console.log(error)
            errorAlert(error.message);
            dispatch(loginEmployeeFailure({
                response: {
                    status: 999,
                    statusText: error.message,
                },
            }));
        });
};
// [END Login App Employee]


// Logout Employee Service
// TODO
// [START Logout Employee Service]
export const logoutEmployeeFailure = error => ({
    type: 'LOGOUT_EMPLOYEE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const logoutEmployeeSuccess = () => ({
    type: 'LOGOUT_EMPLOYEE_SUCCESS',
});

export const logoutAndRedirect = () => (dispatch) => {
    try {
        auth().signOut();
        localStorage.removeItem('idToken');
        dispatch(logoutEmployeeSuccess());
        gtag('event', 'logout', {
            event_category: 'registration',
        });
        history.push('/login');
    } catch (error) {
        console.log(error);
        dispatch(logoutEmployeeFailure({
            response: {
                status: 400,
                statusText: error.message,
            },
        }));
    }
};
// [END Logout Employee Service]
