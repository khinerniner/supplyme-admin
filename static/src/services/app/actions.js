// import { Cookies } from 'react-cookie-banner';
import history from '../../history';
import { auth, db } from '../../store/firebase';
import { parseJSON } from '../../utils/misc';
import { errorAlert, successAlert } from '../../utils/alerts';
import { getAccount } from '../../services/account/actions';

// For AppItems in Swift
import { fetchProperties } from '../../services/property/actions';
import { fetchAccounts } from '../../services/employee/actions';
import { fetchEvents } from '../../services/event/actions';
import { fetchOwners } from '../../services/owner/actions';

// Login Account
//
// [START Login Account]
export const loginAccountRequest = () => ({
    type: 'LOGIN_ACCOUNT_REQUEST',
});


export const loginAccountSuccess = (employeeID, accountID, employee, idToken) => ({
    type: 'LOGIN_ACCOUNT_SUCCESS',
    payload: {
        employeeID,
        accountID,
        employee,
        idToken,
    },
});


export const loginAccountFailure = error => ({
    type: 'LOGIN_ACCOUNT_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const loginAccountWithPermissions = (employeeID, redirectRoute) => (dispatch) => {
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
                const accountRef = db().collection('Accounts').doc(accountID);
                accountRef.collection('Accounts').doc(employeeID).get().then((empDoc) => {
                    if (empDoc.exists) {
                        console.log('Permission Level:', empDoc.data().permissionLevel);
                        const permissionLevel = empDoc.data().permissionLevel;
                        if (permissionLevel === 'deleted') {
                          console.log('Account document deleted!');
                          dispatch(loginAccountFailure({
                              response: {
                                  status: 999,
                                  statusText: 'Account Account Deleted',
                              },
                          }));
                        }
                        localStorage.setItem('idToken', idToken);
                        dispatch(getAccount(accountID));
                        dispatch(loginAccountSuccess(employeeID, accountID, empDoc.data(), idToken));
                        history.push(redirectRoute);
                    } else {
                        console.log('No such Account document!');
                        dispatch(loginAccountFailure({
                            response: {
                                status: 999,
                                statusText: 'No Account Account',
                            },
                        }));
                    }
                })
                .catch((error) => {
                  console.log('Account Ref Error: ' + error.message);
                  dispatch(loginAccountFailure({
                      response: {
                          status: 999,
                          statusText: error.message,
                      },
                  }));
                })
            } else {
                console.log('No such User document');
                dispatch(loginAccountFailure({
                    response: {
                        status: 999,
                        statusText: 'No User Account',
                    },
                }));
            }
        })
        .catch((error) => {
          console.log('User Ref Error: ' + error.message);
          dispatch(loginAccountFailure({
              response: {
                  status: 999,
                  statusText: error.message,
              },
          }));
        })
    });
  } catch (error) {
      console.log('Auth Ref Error: ' + error);
      dispatch(logoutAccountFailure({
          response: {
              status: 999,
              statusText: error.message,
          },
      }));
  }
}

export const loginAccount = (email, password, redirectRoute) => (dispatch) => {
    dispatch(loginAccountRequest());
    return auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (user) {
                try {
                    dispatch(loginAccountWithPermissions(user.user.uid, redirectRoute))
                } catch (error) {
                    dispatch(loginAccountFailure({
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
            dispatch(loginAccountFailure({
                response: {
                    status: 999,
                    statusText: error.message,
                },
            }));
        });
};
// [END Login App Account]


// Logout Account Service
// TODO
// [START Logout Account Service]
export const logoutAccountFailure = error => ({
    type: 'LOGOUT_ACCOUNT_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const logoutAccountSuccess = () => ({
    type: 'LOGOUT_ACCOUNT_SUCCESS',
});

export const logoutAndRedirect = () => (dispatch) => {
    try {
        auth().signOut();
        localStorage.removeItem('idToken');
        dispatch(logoutAccountSuccess());
        gtag('event', 'logout', {
            event_category: 'registration',
        });
        history.push('/login');
    } catch (error) {
        console.log(error);
        dispatch(logoutAccountFailure({
            response: {
                status: 400,
                statusText: error.message,
            },
        }));
    }
};
// [END Logout Account Service]
