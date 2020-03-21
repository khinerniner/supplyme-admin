import history from '../../history';
import { db } from '../../store/firebase';
import { parseJSON } from '../../utils/misc';
import { apiActivateValorCode } from '../../utils/http_functions';
import { toNewValor } from './model';

export const addValor = valor => ({
    type: 'ADD_EMPLOYEE',
    ...valor,
});

export const startFetchingValors = () => ({
    type: 'START_FETCHING_EMPLOYEES',
});

export const receivedValors = () => ({
    type: 'RECEIVED_EMPLOYEES',
    receivedAt: Date.now(),
});
export const receiveValors = querySnapshot => (dispatch) => {
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            const valor = doc.data();
            valor.valorID = doc.id;
            dispatch(addValor(valor));
        });
        dispatch(receivedValors());
    }
};

export const fetchValors = (establishmentID) =>  (dispatch) => {
    dispatch(startFetchingValors());
    db()
        .collection('Establishments')
        .doc(establishmentID)
        .collection('Valors')
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const valors = querySnapshot || [];
                dispatch(receiveValors(valors));
            }, 0);
        }, (error) => {
            console.log(error);
        });
};

// Get Valor Data
//
// [START Get Valor Data]
export const getValorRequest = () => ({
    type: 'FETCH_EMPLOYEE_REQUEST',
});


export const getValorSuccess = (key, valor) => ({
    type: 'RECEIVE_EMPLOYEE_SUCCESS',
    payload: {
        key,
        valor,
    },
});

export const getValorFailure = error => ({
    type: 'RECEIVE_EMPLOYEE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const getValor = (establishmentID, valorID) => (dispatch) => {
    dispatch(getValorRequest());
    console.error(establishmentID)
    console.log(valorID)
    const establishmentRef = db().collection('Establishments').doc(establishmentID);
    const valorRef = establishmentRef.collection('Valors').doc(valorID);
    valorRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Valor data:', doc.data());
            const key = doc.id;
            const value = doc.data();
            dispatch(getValorSuccess(key, value));
        } else {
            console.log('No such valor document!');
            dispatch(getValorFailure({
                response: {
                    status: 400,
                    statusText: 'No Valor Account',
                },
            }));
        }
    });
};
// [END Get Valor Data]

// Save New Valor
//
// [START Save New Valor]
export const saveNewValorRequest = () => ({
    type: 'SAVE_NEW_EMPLOYEE_REQUEST',
});


export const saveNewValorSuccess = () => ({
    type: 'SAVE_NEW_EMPLOYEE_SUCCESS',
});

export const saveNewValorFailure = error => ({
    type: 'SAVE_NEW_EMPLOYEE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const saveNewValor = (token, valorCodeInfo, redirectRoute) => (dispatch) => {
    dispatch(saveNewValorRequest());
    console.log(token)
    console.log(valorCodeInfo)
    console.log(redirectRoute)

    const establishmentID = valorCodeInfo.establishmentID;

    const employmentDate = new Date()

    const newValorCodeDocRef = db().collection("ValorActivationCodes").doc();
    const newTempEstablishmentValorRef = db().collection("Establishments").doc(establishmentID).collection("Valors").doc(newValorCodeDocRef.id)

    const valorID = newValorCodeDocRef.id;
    const valor = toNewValor();
    valor.active = true
    const newName = valorCodeInfo.ownerName.split(' ')
    valor.firstName = newName[0]
    valor.lastName = newName[1]
    valor.email = valorCodeInfo.email;
    valor.activationCode = newValorCodeDocRef.id
    valor.createdTime = employmentDate
    valor.updatedTime = employmentDate
    valor.valorID = valorID;

    valorCodeInfo.activationCode = valor.activationCode
    valorCodeInfo.createdTime = employmentDate
    valorCodeInfo.updatedTime = employmentDate

    console.warn(valor)
    console.warn(valorCodeInfo)

    return db().runTransaction((transaction) => {
      transaction.set(newValorCodeDocRef, valorCodeInfo);
      transaction.set(newTempEstablishmentValorRef, valor);
      return Promise.resolve({ valorID, establishmentID });
    }).then((valorID, establishmentID) => {
        console.log("Transaction successfully committed!");
        dispatch(saveNewValorSuccess());
        dispatch(activateValorCode(token, valorCodeInfo))
        // Analytics
        history.back();
    }).catch((error) => {
        console.log("Transaction failed: ", error);
        dispatch(saveNewValorFailure({
            response: {
                status: 999,
                statusText: error.message,
            },
        }));
    });
};
// [END Save New Valor]

export const addValorCode = valorCode => ({
    type: 'ADD_EMPLOYEE_CODE',
    ...valorCode,
});

export const startFetchingValorCodes = () => ({
    type: 'START_FETCHING_EMPLOYEE_CODES',
});

export const receivedValorCodes = () => ({
    type: 'RECEIVED_EMPLOYEE_CODES',
    receivedAt: Date.now(),
});
export const receiveValorCodes = querySnapshot => function (dispatch) {
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            const valorCode = doc.data();
            valorCode.activationCode = doc.id;
            dispatch(addValorCode(valorCode));
        });
        dispatch(receivedValorCodes());
    }
};

export const fetchValorCodes = (establishmentID) => function (dispatch) {
    dispatch(startFetchingValorCodes());
    db()
        .collection('ValorActivationCodes').where('establishmentID', '==', establishmentID)
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const valorCodes = querySnapshot || [];
                dispatch(receiveValorCodes(valorCodes));
            }, 0);
        }, (error) => {
            console.log(error);
            // Handle Error
        });
};

// Get Valor Code
//
// [START Get Valor Code]
export const getValorCodeRequest = () => ({
    type: 'FETCH_EMPLOYEE_CODE_REQUEST',
});


export const getValorCodeSuccess = (valorCode) => ({
    type: 'RECEIVE_EMPLOYEE_CODE_SUCCESS',
    payload: {
        valorCode,
    },
});

export const getValorCodeFailure = error => ({
    type: 'RECEIVE_EMPLOYEE_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const getValorCode = activationCode => (dispatch) => {
    dispatch(getValorCodeRequest());
    const valorCodeRef = db().collection('ValorActivationCodes').doc(activationCode);
    valorCodeRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Valor Code data:', doc.data());
            const valorCode = doc.data();
            valorCode.activationCode = doc.id;
            dispatch(getValorCodeSuccess(valorCode));
        } else {
            console.log('No such Valor Code document!');
            dispatch(getValorCodeFailure({
                response: {
                    status: 400,
                    statusText: 'No Valor Account',
                },
            }));
        }
    });
};
// [END Get Valor Code]

// Activate Valor Code
// TODO: None
// [START Activate Valor Code]
export const activateValorCodeRequest = () => ({
    type: 'ACTIVATE_EMPLOYEE_CODE_REQUEST',
});

export const activateValorCodeSuccess = () => ({
    type: 'ACTIVATE_EMPLOYEE_CODE_SUCCESS',
});

export const activateValorCodeFailure = error => ({
    type: 'ACTIVATE_EMPLOYEE_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const activateValorCode = (token, valorCode) => (dispatch) => {
        dispatch(activateValorCodeRequest());
        db().collection('ValorActivationCodes').doc(valorCode.activationCode).update({
            valid: true,
        }).then((response) => {
          return apiActivateValorCode(token, valorCode)
          .then(parseJSON)
              .then((response) => {
                  dispatch(activateValorCodeSuccess());

                  // Add Analytics
                  // Add Swal Alert
              })
              .catch((error) => {
                  // Add Analytics
                  dispatch(activateValorCodeFailure({
                      response: {
                          status: error.response.status,
                          statusText: error.response.data.statusText,
                      },
                  }));
              });
        }).catch((error) => {
            // Add Analytics
            dispatch(activateValorCodeFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Activate Valor Code]

// Deactivate Valor Code
// TODO: None
// [START Deactivate Valor Code]
export const deactivateValorCodeRequest = () => ({
    type: 'DEACTIVATE_EMPLOYEE_CODE_REQUEST',
});

export const deactivateValorCodeSuccess = () => ({
    type: 'DEACTIVATE_EMPLOYEE_CODE_SUCCESS',
});

export const deactivateValorCodeFailure = error => ({
    type: 'DEACTIVATE_EMPLOYEE_CODE_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const deactivateValorCode = (token, valorCode) => (dispatch) => {
    console.log(valorCode)
        dispatch(deactivateValorCodeRequest());
        db().collection('ValorActivationCodes').doc(valorCode.activationCode).update({
            valid: false,
        }).then((response) => {
            // Add Analytics
            // Add Alert
            dispatch(deactivateValorCodeSuccess());
        }).catch((error) => {
            // Add Analytics
            dispatch(deactivateValorCodeFailure({
                response: {
                    status: error.response.status,
                    statusText: error.response.data.statusText,
                },
            }));
        });
};
// [END Deactivate Valor Code]
