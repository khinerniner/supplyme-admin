// import { Cookies } from 'react-cookie-banner';
import history from '../../history';
import { auth, db } from '../../store/firebase';
import { parseJSON } from '../../utils/misc';
import { errorAlert } from '../../utils/alerts';
import { tabsAnalytic } from '../../utils/analytics';
import { toNewHospital } from '../hospital/model';
import { getHospital } from '../hospital/actions';
import { toNewEmployee } from '../employee/model';
import {
  apiMigratePOS,
  apiGetPOSData,
} from '../../utils/http_functions';

// Register Hospital
//
// [START Register Hospital]
export const registerHospitalRequest = () => ({
    type: 'REGISTER_HOSPITAL_REQUEST',
});


export const registerHospitalSuccess = (userID, accountID, accountType, employee, idToken) => ({
    type: 'REGISTER_HOSPITAL_SUCCESS',
    payload: {
        userID,
        accountID,
        accountType,
        employee,
        idToken,
    },
});


export const registerHospitalFailure = error => ({
    type: 'REGISTER_HOSPITAL_FAILURE',
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
        console.log('Invalid Activation Code');
        return false;
      }
    })
    .catch((error) => {
      console.log('Activation Code Ref Error: ' + error.message);
      return false;
    })
}

export const registerHospital = (hospitalCode, password, redirectRoute) => (dispatch) => {
    console.log(hospitalCode)
    console.log(password)
    console.log(redirectRoute)
    dispatch(registerHospitalRequest());
    return validateActivationCode(hospitalCode.activationCode).then((response) => {
      if (!response) {
        console.log('Error Validating Auth Code')
        return;
      }

      const hospitalRef = db().collection('Hospitals').doc();
      const hospitalLocRef = db().collection('HospitalLocations').doc(hospitalRef.id);
      const activationCodeRef = db().collection('ActivationCodes').doc(hospitalCode.activationCode);
      const employeeActivationCodeRef = db().collection('EmployeeActivationCodes').doc(hospitalCode.activationCode);

      const hospitalInfo = toNewHospital()
      hospitalInfo.name = hospitalCode.hospitalName;

      return auth().createUserWithEmailAndPassword(hospitalCode.email, password).then((user) => {
            try {
              return db().runTransaction((transaction) => {
                  return auth().currentUser.getIdToken().then((idToken) => {
                    const hospitalLoc = {
                        active: true,
                        deleted: false,
                        discount: '0%',
                        createdTime: null,
                        updatedTime: null,
                        radius: 25,
                        note: hospitalCode.hospitalName,
                        geohash: null,
                        location: null,
                        wait: '0m',
                        fare: 0.0,
                    }

                    const newUserRef = db().collection('MasterUserList').doc(user.user.uid);
                    const newEmployeeRef = hospitalRef.collection('Employees').doc(user.user.uid);

                    const updatedTime = new Date()

                    const employeeInfo = toNewEmployee()
                    const newName = hospitalCode.ownerName.split(' ')
                    employeeInfo.firstName = newName[0]
                    employeeInfo.lastName = newName[1]
                    employeeInfo.email = hospitalCode.email
                    employeeInfo.active = true
                    employeeInfo.terms = true
                    employeeInfo.privacy = true
                    employeeInfo.permissionLevel = "owner"

                    hospitalInfo.active = true
                    hospitalInfo.createdTime = updatedTime
                    hospitalInfo.updatedTime = updatedTime
                    hospitalInfo.requestCount = 0
                    hospitalInfo.hospitalID = hospitalRef.id

                    transaction.set(hospitalLocRef, hospitalLoc)
                    transaction.set(hospitalRef, hospitalInfo)
                    transaction.set(activationCodeRef, { accountID: hospitalRef.id, valid: false, updatedTime: updatedTime })
                    transaction.set(employeeActivationCodeRef, { valid: false })
                    transaction.set(newUserRef,
                        {
                            accountID: hospitalRef.id,
                            accountType: "hospital"
                        }
                    )
                    transaction.set(newEmployeeRef, employeeInfo)
                    return {
                        employeeID: user.user.uid,
                        establshmentID: hospitalRef.id,
                        accountType: 'hospital',
                        employeeInfo,
                        idToken
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                    dispatch(registerHospitalFailure({
                        response: {
                            status: 999,
                            statusText: error.message,
                        },
                    }));
                    return null
                  })
              }).then((result) => {
                  console.log("Transaction successfully committed!");
                  console.log(result)
                  if (result === null) {
                      return;
                  }
                  dispatch(registerHospitalSuccess(
                      result.employeeID,
                      result.establshmentID,
                      result.accountType,
                      result.employeeInfo,
                      result.idToken,
                  ));
                  dispatch(getHospital(result.establshmentID));
                  tabsAnalytic('register_hospital_success', null);
                  history.push(redirectRoute);
              }).catch((error) => {
                  console.log("Transaction failed: ", error);
                  errorAlert(error.message);
                  tabsAnalytic('register_hospital_failure', null);
                  dispatch(registerHospitalFailure({
                      response: {
                          status: 999,
                          statusText: error.message,
                      },
                  }));
              });
            } catch (error) {
                console.log(error)
                errorAlert(error.message);
                tabsAnalytic('register_hospital_failure', null);
                dispatch(registerHospitalFailure({
                    response: {
                        status: 999,
                        statusText: error.message,
                    },
                }));
            }
      })
      .catch((error) => {
          console.log(error)
          errorAlert(error.message);
          tabsAnalytic('register_hospital_failure', null);
          dispatch(registerHospitalFailure({
              response: {
                  status: 999,
                  statusText: error.message,
              },
          }));
      });
  });
};
// [END Register App Hospital]

// Migrate Hospital POS
// TODO: None
// [START Migrate Hospital POS]
export const migratePOSRequest = () => ({
    type: 'MIGRATE_POS_REQUEST',
});

export const migratePOSSuccess = (pos) => ({
    type: 'MIGRATE_POS_SUCCESS',
    payload: {
        pos,
    }
});

export const migratePOSFailure = error => ({
    type: 'MIGRATE_POS_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const migratePOS = (token, employeeID, accountID, locationID, keyID, redirectRoute) => (dispatch) => {
    console.log(token)
    console.log(employeeID)
    console.log(accountID)
    console.log(locationID)
    console.log(keyID)
    dispatch(migratePOSRequest());
    return apiMigratePOS(token, accountID, locationID, keyID)
        .then(parseJSON)
        .then((response) => {
            // generalAnalytic(employeeID, 'dwolla', 'createDwollaCustomerSuccess');
            // generalAlert(200, 'Create Dwolla Customer Success');
            const pos = {
              active: true,
              type: response.posType,
              hash: response.posHash,
              revenueCenterID: null,
              orderTypeID: null,
              tableID: null,
              employeeID: null,
              tenderTypeId: null,
            }
            dispatch(migratePOSSuccess(pos));
            history.push(redirectRoute)
        })
        .catch((error) => {
            // generalAlert(400, error.message || error);
            // generalAnalytic(employeeID, 'dwolla', 'createDwollaCustomerFailure');
            dispatch(migratePOSFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Migrate Hospital POS]

// Get POS Map Data
// TODO: None
// [START Get POS Map Data]
export const getPOSData = (token, employeeID, accountID, lcoationID) => {
    console.log(token)
    console.log(employeeID)
    console.log(accountID)
    console.log(lcoationID)
    return apiGetPOSData(token, accountID, lcoationID)
        .then(parseJSON)
        .then((response) => {
            // generalAnalytic(employeeID, 'dwolla', 'getPOSData');
            const posData = {
              revenueCenters: response.data.orderTypes,
              orderTypes: response.data.orderTypes,
              tables: response.data.tables,
              employees: response.data.employees,
              tenderTypes: response.data.tenderTypes,
            }
            return posData;
        })
        .catch((error) => {
            console.log(error)
            // generalAlert(400, error.message || error);
            // generalAnalytic(employeeID, 'dwolla', 'getPOSData');
        });
};
// [END Migrate Hospital POS]
