import history from '../../history';
import { auth, db } from '../../store/firebase';
import { parseJSON } from '../../utils/misc';
import { errorAlert } from '../../utils/alerts';
import { privalgoAnalytic } from '../../utils/analytics';
import { toPrivalgoAccount } from '../account/model';
import { getAccount } from '../../services/account/actions';
import { toNewAccount } from '../account/model';

// Register Account
// TODO: None
// [START Register Account]
export const registerAccountRequest = () => ({
    type: 'REGISTER_ACCOUNT_REQUEST',
});


export const registerAccountSuccess = (employeeID, accountID, employee, idToken) => ({
    type: 'REGISTER_ACCOUNT_SUCCESS',
    payload: {
        employeeID,
        accountID,
        employee,
        idToken,
    },
});


export const registerAccountFailure = error => ({
    type: 'REGISTER_ACCOUNT_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const validateActivationCode = (code) => {
  const codeRef = db().collection('ActivationCodes').doc(code);
  return codeRef.get().then((doc) => {
      if (doc.exists && doc.data().valid) {
        return true;
      } else {
        return false;
      }
    }).catch((error) => {
      console.log(error);
      privalgoAnalytic('activation_code_ref_failure');
      return false;
    })
}

export const registerAccount = (accountCode, password, redirectRoute) => (dispatch) => {
    console.log(accountCode)
    console.log(password)
    console.log(redirectRoute)
    dispatch(registerAccountRequest());
    return validateActivationCode(accountCode.activationCode).then((response) => {
        if (!response) {
          console.log('Error Validating Auth Code');
          errorAlert('Error Validating Auth Code')
          privalgoAnalytic('register_account_failure');
          dispatch(registerAccountFailure({
              response: {
                  status: 403,
                  statusText: "Error Validating Auth Code",
              },
          }));
          return;
        }
        const accountRef = db().collection('Accounts').doc();
        const activationCodeRef = db().collection('ActivationCodes').doc(accountCode.activationCode);

        const accountInfo = toPrivalgoAccount()
        accountInfo.name = accountCode.accountName;
        return auth().createUserWithEmailAndPassword(accountCode.email, password).then((user) => {
            return db().runTransaction((transaction) => {
                return auth().currentUser.getIdToken().then((idToken) => {

                  const employmentDate = Date.now()

                  const newUserRef = db().collection('MasterUserList').doc(user.user.uid);
                  transaction.set(newUserRef, { accountID: accountRef.id });

                  transaction.set(activationCodeRef, { accountID: accountRef.id, valid: false, updatedDate: employmentDate });

                  const newEmployeeRef = accountRef.collection('Employees').doc(user.user.uid);
                  const accountInfo = toNewAccount();
                  accountInfo.name = accountCode.ownerName;
                  accountInfo.phoneNumber = accountCode.phoneNumber;
                  accountInfo.email = accountCode.email;
                  accountInfo.activationCode = accountCode.activationCode;
                  accountInfo.permissionLevel = 'owner';
                  accountInfo.employmentDate = employmentDate;
                  accountInfo.creationDate = employmentDate;
                  accountInfo.updatedDate = employmentDate;
                  accountInfo.employeeID = user.user.uid;
                  accountInfo.unenrolled = false;
                  accountInfo.isActive = true;
                  accountInfo.isOnline = true;
                  accountInfo.isLoggedIn = true;
                  transaction.set(accountRef, accountInfo );
                  return {
                      employeeID: user.user.uid,
                      accountID: accountRef.id,
                      accountInfo,
                      idToken,
                  };
                }).catch((error) => {
                  console.log(error)
                  errorAlert(error.message);
                  privalgoAnalytic('register_account_failure', null);
                  dispatch(registerAccountFailure({
                      response: {
                          status: 999,
                          statusText: error.message,
                      },
                  }));
                  throw (error)
                })
            }).then((result) => {
                console.log("Transaction successfully committed!");
                console.log(result)
                dispatch(registerAccountSuccess(
                  result.employeeID,
                  result.accountID,
                  result.accountInfo,
                  result.idToken,
                ));
                dispatch(getAccount(result.accountID));
                privalgoAnalytic('register_account_success', null);
                history.push(redirectRoute);
            }).catch((error) => {
                console.log("Transaction failed: ", error);
                errorAlert(error.message);
                privalgoAnalytic('register_account_failure', null);
                dispatch(registerAccountFailure({
                    response: {
                        status: 999,
                        statusText: error.message,
                    },
                }));
            });
        }).catch((error) => {
            console.log(error)
            errorAlert(error.message);
            privalgoAnalytic('register_account_failure', null);
            return dispatch(registerAccountFailure({
                response: {
                    status: 999,
                    statusText: error.message,
                },
            }));
        });
    });
};
// [END Register Account]
