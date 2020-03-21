import history from '../../history';
import { db } from '../../store/firebase';
import { errorAlert, successAlert } from '../../utils/alerts';
import { tabsAnalytic } from '../../utils/analytics';
import {
  parseJSON,
  validateKey,
  validateString,
  validatePhone,
  validateAddress,
} from '../../utils/misc';
import {
  apiActivateHospitalCode,
  apiMigratePOS,
  apiCreateDwollaCustomer,
} from '../../utils/http_functions';

import { getHospitalFromSnapshot, getHospitalLocFromSnapshot } from './model';

export const addHospital = hospital => ({
    type: 'ADD_HOSPITAL',
    ...hospital,
});

export const startFetchingHospitals = () => ({
    type: 'START_FETCHING_HOSPITALS',
});

export const receivedHospitals = () => ({
    type: 'RECEIVED_HOSPITALS',
    receivedAt: Date.now(),
});
export const receiveHospitals = querySnapshot => (dispatch) => {
    querySnapshot.forEach((doc) => {
        const hospital = doc.data();
        hospital.key = doc.id;
        dispatch(addHospital(hospital));
    });
    dispatch(receivedHospitals());
};

export const fetchHospitals = () => (dispatch) => {
    dispatch(startFetchingHospitals());
    db()
        .collection('Hospitals')
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const hospitals = querySnapshot || [];
                dispatch(receiveHospitals(hospitals));
            }, 0);
        }, (error) => {
            console.log(error);
        });
};

// Get Hospital Data
//
// [START Get Hospital Data]
export const getHospitalRequest = () => ({
    type: 'FETCH_HOSPITAL_REQUEST',
});


export const getHospitalSuccess = (hospital) => ({
    type: 'RECEIVE_HOSPITAL_SUCCESS',
    payload: {
        hospital,
    },
});

export const getHospitalFailure = error => ({
    type: 'RECEIVE_HOSPITAL_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const getHospital = hospitalID => (dispatch) => {
    dispatch(getHospitalRequest());
    const hospitalRef = db().collection('Hospitals').doc(hospitalID);
    hospitalRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Document data:', doc.data());
            const hospital = doc.data();
            hospital.hospitalID = doc.id;
            dispatch(getHospitalSuccess(hospital));
        } else {
            console.log('No such hospital document!');
            dispatch(getHospitalFailure({
                response: {
                    status: 400,
                    statusText: 'No Hospital Account',
                },
            }));
        }
    });
};
// [END Get Hospital Data]

// Create Hospital Code
// TODO: None
// [START Create Hospital Code]
export const createHospitalCodeRequest = () => ({
    type: 'CREATE_HOSPITAL_CODE_REQUEST',
});

export const createHospitalCodeSuccess = () => ({
    type: 'CREATE_HOSPITAL_CODE_SUCCESS',
});

export const createHospitalCodeFailure = error => ({
    type: 'CREATE_HOSPITAL_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const createHospitalCode = (token, hospitalCode) => (dispatch) => {
      dispatch(createHospitalCodeRequest());
      const codeRef = db().collection('ActivationCodes').doc()
      hospitalCode.activationCode = codeRef.id;
      hospitalCode.createdTime = new Date();
      hospitalCode.updatedDate = new Date();
      codeRef.set(hospitalCode).then(() => {
            dispatch(createHospitalCodeSuccess());
            dispatch(activateHospitalCode(token, hospitalCode))
            // Analytics
          })
          .catch((error) => {
              // Analytics
              dispatch(createHospitalCodeFailure({
                  response: {
                      status: 400,
                      statusText: error.message,
                  },
              }));
          });
};
// [END Create Hospital Code]


export const addHospitalCode = hospitalCode => ({
    type: 'ADD_HOSPITAL_CODE',
    ...hospitalCode,
});

export const startFetchingHospitalCodes = () => ({
    type: 'START_FETCHING_HOSPITAL_CODES',
});

export const receivedHospitalCodes = () => ({
    type: 'RECEIVED_HOSPITAL_CODES',
    receivedAt: Date.now(),
});
export const receiveHospitalCodes = querySnapshot => (dispatch) => {
    querySnapshot.forEach((doc) => {
        const hospitalCode = doc.data();
        hospitalCode.activationCode = doc.id;
        dispatch(addHospitalCode(hospitalCode));
    });
    dispatch(receivedHospitalCodes());
};

export const fetchHospitalCodes = () => (dispatch) => {
    dispatch(startFetchingHospitalCodes());
    db()
        .collection('ActivationCodes').where('accountType', '==', 'hospital')
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const hospitalCodes = querySnapshot || [];
                dispatch(receiveHospitalCodes(hospitalCodes));
            }, 0);
        }, (error) => {
            console.log(error);
            // Handle Error
        });
};

// Get Hospital Data
//
// [START Get Hospital Data]
export const getHospitalCodeRequest = () => ({
    type: 'FETCH_HOSPITAL_CODE_REQUEST',
});


export const getHospitalCodeSuccess = (hospitalCode) => ({
    type: 'RECEIVE_HOSPITAL_CODE_SUCCESS',
    payload: {
        hospitalCode,
    },
});

export const getHospitalCodeFailure = error => ({
    type: 'RECEIVE_HOSPITAL_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const getHospitalCode = activationCode => (dispatch) => {
    dispatch(getHospitalCodeRequest());
    const hospitalRef = db().collection('ActivationCodes').doc(activationCode);
    hospitalRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Hospital Code data:', doc.data());
            const hospitalCode = doc.data();
            hospitalCode.activationCode = doc.id;
            dispatch(getHospitalCodeSuccess(hospitalCode));
        } else {
            console.log('No such Hospital Code document!');
            dispatch(getHospitalCodeFailure({
                response: {
                    status: 400,
                    statusText: 'No Hospital Account',
                },
            }));
        }
    });
};
// [END Get Hospital Data]

// Activate Hospital
// TODO: None
// [START Activate Hospital]
export const activateHospitalRequest = () => ({
    type: 'ACTIVATE_HOSPITAL_REQUEST',
});

export const activateHospitalSuccess = () => ({
    type: 'ACTIVATE_HOSPITAL_SUCCESS',
});

export const activateHospitalFailure = error => ({
    type: 'ACTIVATE_HOSPITAL_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const activateHospital = (token, hospital) => (dispatch) => {
        dispatch(activateHospitalRequest());
        // Verify Hospital ID
        // Verify Hospital Phone
        // Verify Address
        // Verify Geolocation
        // Verify Merchant (Fiat or Crypto)
        // Verify POS (Omnivore or Clover)
        const hospitalID = hospital.hospitalID;
        if (!validateKey(hospitalID)) {
            errorAlert('Invalid Hospital ID');
            return;
        }
        const phone = hospital.phoneNumber;
        if (!validatePhone(phone)) {
            errorAlert('Invalid Hospital Phone');
            return;
        }
        const address = hospital.address;
        if (!validateAddress(address)) {
            errorAlert('Invalid Hospital Address');
            return;
        }
        const merchants = hospital.merchants;
        if (!validateMerchants(merchants)) {
            errorAlert('Invalid Hospital Default Merchant');
            return;
        }
        const pos = hospital.pos;
        if (!validatePOS(pos)) {
            errorAlert('Invalid Hospital POS');
            return;
        }
        // Transaction that updates hospital & geolocation

        const currentHospitalInfo = hospital;

        const currentHospitalRef = db().collection('Hospitals').doc(hospitalID);
        const currentHospitalLocRef = db().collection('HospitalLocations').doc(hospitalID);
        const futureLegacyHospital = db().collection('LegacyHospitals').doc()
        const futureLegacyHospitalLoc = db().collection('LegacyHospitalLocations').doc()

        const updatedTime = new Date();

        return db().runTransaction(transaction => transaction.get(currentHospitalRef).then((currentHospitalSnapshot) => transaction.get(currentHospitalLocRef).then((currentHospitalLocSnapshot) =>{
            if (!currentHospitalSnapshot.exists) {
                throw 'Hospital Does Not Exists';
            }

            // Update Hospital Information
            transaction.set(futureLegacyHospital, currentHospitalSnapshot.data())
            transaction.set(futureLegacyHospital, {'active': false, 'newHospitalRef': currentHospitalRef}, {merge: true})
            const oldDocRef = currentHospitalSnapshot.data()['oldHospitalRef']
            if (oldDocRef) {
                transaction.update(oldDocRef, {'newHospitalRef': futureLegacyHospital})
            }
            currentHospitalInfo.active = true
            currentHospitalInfo.deleted = false
            currentHospitalInfo.updatedTime = updatedTime
            currentHospitalInfo.oldHospitalRef = futureLegacyHospital
            transaction.set(currentHospitalRef, getHospitalFromSnapshot(currentHospitalInfo));

            if (!currentHospitalLocSnapshot.exists) {
                throw 'Hospital Loc Does Not Exists';
            }
            console.log(currentHospitalLocSnapshot)
            const currentHospitalLocInfo = getHospitalLocFromSnapshot(currentHospitalLocSnapshot.data());
            currentHospitalLocInfo.hospitalLocID = currentHospitalLocSnapshot.id;

            // Update Hospital Loc Information
            transaction.set(futureLegacyHospitalLoc, currentHospitalLocSnapshot.data())
            transaction.set(futureLegacyHospitalLoc, {'active': false, 'newHospitalLocRef': currentHospitalLocRef}, {merge: true})
            const oldLocDocRef = currentHospitalLocSnapshot.data()['oldHospitalLocRef']
            if (oldLocDocRef) {
                transaction.update(oldLocDocRef, {'newHospitalLocRef': futureLegacyHospitalLoc})
            }
            currentHospitalLocInfo.active = true
            currentHospitalLocInfo.deleted = false
            currentHospitalLocInfo.createdTime = updatedTime
            currentHospitalLocInfo.updatedTime = updatedTime
            currentHospitalLocInfo.geohash = currentHospitalInfo.address.geohash
            currentHospitalLocInfo.location = currentHospitalInfo.address.location
            currentHospitalLocInfo.fare = currentHospitalInfo.occupancy.defaultFare
            currentHospitalLocInfo.discount = '10%'
            currentHospitalLocInfo.updatedTime = updatedTime
            currentHospitalLocInfo.oldHospitalLocRef = futureLegacyHospitalLoc
            transaction.set(currentHospitalLocRef, getHospitalLocFromSnapshot(currentHospitalLocInfo));

            return Promise.resolve({ currentHospitalRef, currentHospitalInfo });

        }))).then((result) => {
            console.log('Transaction successfully committed!');
            dispatch(activateHospitalSuccess());
            successAlert('Activate Hospital Success!');
            tabsAnalytic('activate_hospital_success', null);
            history.push(`/hospitals/${hospitalID}/dashboard/home`)
        }).catch((error) => {
            console.log('Transaction failed: ', error.message || error);
            console.log(error.message || error);
            errorAlert(error.message || error);
            tabsAnalytic('activate_hospital_failure', null);
            dispatch(activateHospitalFailure({
                response: {
                    status: 403,
                    statusText: error.message || error,
                },
            }));
        });
};
// [END Activate Hospital]

// Deactivate Hospital
// TODO: None
// [START Deactivate Hospital]
export const deactivateHospitalRequest = () => ({
    type: 'DEACTIVATE_HOSPITAL_REQUEST',
});

export const deactivateHospitalSuccess = () => ({
    type: 'DEACTIVATE_HOSPITAL_SUCCESS',
});

export const deactivateHospitalFailure = error => ({
    type: 'DEACTIVATE_HOSPITAL_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const deactivateHospital = (token, hospital) => (dispatch) => {
      console.log(hospital)
      db().collection('Hospitals').doc(hospitalID).update({
          active: false,
          deleted: false,
      }).then((response) => {
        dispatch(deactivateHospitalSuccess());
        // return apiDeactivateHospital(token, hospital.hospitalID)
        // .then(parseJSON)
        //     .then((response) => {
        //         dispatch(deactivateHospitalSuccess());
        //         // Add Analytics
        //         // Add Swal Alert
        //     })
        //     .catch((error) => {
        //         // Add Analytics
        //         dispatch(deactivateHospitalFailure({
        //             response: {
        //                 status: error.response.status,
        //                 statusText: error.response.data.statusText,
        //             },
        //         }));
        //     });
    }).catch((error) => {
        // Add Analytics
        dispatch(deactivateHospitalFailure({
            response: {
                status: error.response.status,
                statusText: error.response.data.statusText,
            },
        }));
    });
};
// [END Deactivate Hospital]

// Activate Hospital Code
// TODO: None
// [START Activate Hospital Code]
export const activateHospitalCodeRequest = () => ({
    type: 'ACTIVATE_HOSPITAL_CODE_REQUEST',
});

export const activateHospitalCodeSuccess = () => ({
    type: 'ACTIVATE_HOSPITAL_CODE_SUCCESS',
});

export const activateHospitalCodeFailure = error => ({
    type: 'ACTIVATE_HOSPITAL_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const activateHospitalCode = (token, hospitalCode) => (dispatch) => {
        dispatch(activateHospitalCodeRequest());
        db().collection('ActivationCodes').doc(hospitalCode.activationCode).update({
            valid: true,
        }).then((response) => {
          return apiActivateHospitalCode(token, hospitalCode)
          .then(parseJSON)
              .then((response) => {
                  dispatch(activateHospitalCodeSuccess());
                  history.push('/admin/hospitals/codes')
                  // Add Analytics
                  // Add Swal Alert
              })
              .catch((error) => {
                  // Add Analytics
                  dispatch(activateHospitalCodeFailure({
                      response: {
                          status: error.response.status,
                          statusText: error.response.data.statusText,
                      },
                  }));
              });
        }).catch((error) => {
            // Add Analytics
            dispatch(activateHospitalCodeFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Activate Hospital Code]

// Deactivate Hospital Code
// TODO: None
// [START Deactivate Hospital Code]
export const deactivateHospitalCodeRequest = () => ({
    type: 'DEACTIVATE_HOSPITAL_CODE_REQUEST',
});

export const deactivateHospitalCodeSuccess = () => ({
    type: 'DEACTIVATE_HOSPITAL_CODE_SUCCESS',
});

export const deactivateHospitalCodeFailure = error => ({
    type: 'DEACTIVATE_HOSPITAL_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const deactivateHospitalCode = (token, hospitalCode) => (dispatch) => {
    console.log(hospitalCode)
        dispatch(deactivateHospitalCodeRequest());
        db().collection('ActivationCodes').doc(hospitalCode.activationCode).update({
            valid: false,
        }).then((response) => {
            // Add Analytics
            // Add Alert
            dispatch(deactivateHospitalCodeSuccess());
        }).catch((error) => {
            // Add Analytics
            dispatch(deactivateHospitalCodeFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Deactivate Hospital Code]

// Update Hospital
//
// [START Update Hospital]
export const updateHospitalRequest = () => ({
    type: 'UPDATE_HOSPITAL_REQUEST',
});


export const updateHospitalSuccess = hospital => ({
    type: 'UPDATE_HOSPITAL_SUCCESS',
    payload: {
        hospital,
    },
});

export const updateHospitalFailure = error => ({
    type: 'UPDATE_HOSPITAL_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const updateHospital = (employeeID, accountID, hospital, redirectRoute) => (dispatch) => {
    dispatch(updateHospitalRequest());
    console.log(employeeID);
    console.log(accountID);
    console.log(hospital);
    const hospitalID = hospital.hospitalID;
    if (!validateKey(hospitalID)) {
        errorAlert('Invalid Hospital ID');
        return;
    }
    const phone = hospital.phoneNumber;
    if (!validatePhone(phone)) {
        errorAlert('Invalid Hospital Phone');
        return;
    }
    const address = hospital.address;
    if (!validateAddress(address)) {
        errorAlert('Invalid Hospital Address');
        return;
    }

    console.log(hospital)
    const currentHospitalInfo = hospital

    const currentHospitalRef = db().collection('Hospitals').doc(hospitalID);
    const currentHospitalLocRef = db().collection('HospitalLocations').doc(hospitalID);
    const futureLegacyHospital = db().collection('LegacyHospitals').doc()
    const futureLegacyHospitalLoc = db().collection('LegacyHospitalLocations').doc()

    const updatedTime = new Date();

    return db().runTransaction(transaction => transaction.get(currentHospitalRef).then((currentHospitalSnapshot) => transaction.get(currentHospitalLocRef).then((currentHospitalLocSnapshot) => {
        if (!currentHospitalSnapshot.exists) {
            throw 'Document Does Not Exists';
        }

        transaction.set(futureLegacyHospital, currentHospitalSnapshot.data())
        transaction.set(futureLegacyHospital, {'active': false, 'newHospitalRef': currentHospitalRef}, {merge: true})
        const oldDocRef = currentHospitalSnapshot.data()['oldHospitalRef']
        if (oldDocRef) {
            transaction.update(oldDocRef, {'newHospitalRef': futureLegacyHospital})
        }
        currentHospitalInfo.updatedTime = updatedTime
        currentHospitalInfo.oldHospitalRef = futureLegacyHospital
        transaction.set(currentHospitalRef, getHospitalFromSnapshot(currentHospitalInfo));

        if (!currentHospitalLocSnapshot.exists) {
            throw 'Hospital Loc Does Not Exists';
        }
        console.log(currentHospitalLocSnapshot)
        const currentHospitalLocInfo = getHospitalLocFromSnapshot(currentHospitalLocSnapshot.data());
        currentHospitalLocInfo.hospitalLocID = currentHospitalLocSnapshot.id;

        // Update Hospital Loc Information
        transaction.set(futureLegacyHospitalLoc, currentHospitalLocSnapshot.data())
        transaction.set(futureLegacyHospitalLoc, {'active': false, 'newHospitalLocRef': currentHospitalLocRef}, {merge: true})
        const oldLocDocRef = currentHospitalLocSnapshot.data()['oldHospitalLocRef']
        if (oldLocDocRef) {
            transaction.update(oldLocDocRef, {'newHospitalLocRef': futureLegacyHospitalLoc})
        }
        currentHospitalLocInfo.updatedTime = updatedTime
        currentHospitalLocInfo.geohash = currentHospitalInfo.address.geohash
        currentHospitalLocInfo.location = currentHospitalInfo.address.location
        currentHospitalLocInfo.fare = currentHospitalInfo.occupancy.defaultFare
        currentHospitalLocInfo.discount = '10%'
        currentHospitalLocInfo.updatedTime = updatedTime
        currentHospitalLocInfo.oldHospitalLocRef = futureLegacyHospitalLoc
        transaction.set(currentHospitalLocRef, getHospitalLocFromSnapshot(currentHospitalLocInfo));

        return Promise.resolve({ currentHospitalRef, currentHospitalInfo });

    }))).then((result) => {
        console.log('Transaction successfully committed!');
        tabsAnalytic('hospital', 'updateHospitalSuccess');
        dispatch(updateHospitalSuccess(result.currentHospitalInfo));
        successAlert('Update Hospital Success!');
        console.log(redirectRoute)
        history.push(redirectRoute)
    }).catch((error) => {
        console.log('Transaction failed: ', error.message || error);
        errorAlert(error.message );
        tabsAnalytic('hospital', 'updateHospitalFailure');
        dispatch(updateHospitalFailure({
            response: {
                status: 403,
                statusText: error.message || error,
            },
        }));
    });
};
// [END Update Hospital]

// Create Dwolla Customer
// TODO: None
// [START Create Dwolla Customer]
export const createDwollaCustomerRequest = () => ({
    type: 'CREATE_MERCHANT_CUSTOMER_REQUEST',
});

export const createDwollaCustomerSuccess = () => ({
    type: 'CREATE_MERCHANT_CUSTOMER_SUCCESS',
});

export const createDwollaCustomerFailure = error => ({
    type: 'CREATE_MERCHANT_CUSTOMER_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const createDwollaCustomer = (token, employeeID, accountID, firstName, lastName) => (dispatch) => {
    console.log(token)
    console.log(employeeID)
    console.log(accountID)
    console.log(firstName)
    console.log(lastName)
    dispatch(createDwollaCustomerRequest());
    return apiCreateDwollaCustomer(token, accountID, firstName, lastName)
        .then(parseJSON)
        .then((response) => {
            tabsAnalytic('dwolla', 'createDwollaCustomerSuccess');
            successAlert('Create Dwolla Customer Success');
            dispatch(createDwollaCustomerSuccess());
        })
        .catch((error) => {
            errorAlert(error.message);
            tabsAnalytic('dwolla', 'createDwollaCustomerFailure');
            dispatch(createDwollaCustomerFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Create Dwolla Customer]
