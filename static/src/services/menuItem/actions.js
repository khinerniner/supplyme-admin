import history from '../../history';
import { db } from '../../store/firebase';
import { parseJSON, formatFirestoreDateString, validateString, validateKey } from '../../utils/misc';
import { apiBulkUploadMenuItems } from '../../utils/http_functions';
import { toNewMenuItem, getMenuItemFromSnapshot } from './model';
import { errorAlert, successAlert } from '../../utils/alerts';
import { supplyMeAnalytic } from '../../utils/analytics';

export const addMenuItem = menuItem => ({
    type: 'ADD_MENUITEM',
    ...menuItem,
});

export const startFetchingMenuItems = () => ({
    type: 'START_FETCHING_MENUITEMS',
});

export const receivedMenuItems = () => ({
    type: 'RECEIVED_MENUITEMS',
    receivedAt: Date.now(),
});
export const receiveMenuItems = querySnapshot => (dispatch) => {
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            const menuItem = doc.data();
            menuItem.menuItemID = doc.id;
            dispatch(addMenuItem(menuItem));
        });
        dispatch(receivedMenuItems());
    }
};

export const fetchMenuItems = (employeeID, accountID) => (dispatch) => {
    dispatch(startFetchingMenuItems());
    db()
        .collection('Accounts')
        .doc(accountID)
        .collection('MenuItems')
        .onSnapshot((querySnapshot) => {
            setTimeout(() => {
                const menuItems = querySnapshot || [];
                dispatch(receiveMenuItems(menuItems));
            }, 0);
        }, (error) => {
            console.log(error);
        });
};

// Save New MenuItem
//
// [START Save New MenuItem]
export const saveNewMenuItemMenuItem = () => ({
    type: 'SAVE_NEW_MENUITEM_MENUITEM',
});


export const saveNewMenuItemSuccess = () => ({
    type: 'SAVE_NEW_MENUITEM_SUCCESS',
});

export const saveNewMenuItemFailure = error => ({
    type: 'SAVE_NEW_MENUITEM_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});
export const saveNewMenuItem = (token, employeeID, accountID, menuItem, redirectRoute) => (dispatch) => {
    dispatch(saveNewMenuItemMenuItem());

    const createdDate = new Date()

    const accountRef = db().collection("Accounts").doc(accountID)
    const newAccountMenuItemRef = accountRef.collection("MenuItems").doc()

    const menuItemInfo = menuItem;
    menuItemInfo.active = true;
    menuItemInfo.deleted = false;
    menuItemInfo.createdDate = createdDate;
    menuItemInfo.itemID = newAccountMenuItemRef.id;

    console.warn(menuItemInfo);

    return db().runTransaction((transaction) => {
        transaction.set(newAccountMenuItemRef, getMenuItemFromSnapshot(menuItemInfo));
        return Promise.resolve(menuItemInfo);
    }).then((menuItemInfo) => {
        console.log("Transaction successfully committed!");
        dispatch(saveNewMenuItemSuccess());
        // dispatch(addMenuItem(menuItem))
        // Analytics
        history.push(redirectRoute)
    }).catch((error) => {
        console.log("Transaction failed: ", error);
        dispatch(saveNewMenuItemFailure({
            response: {
                status: 999,
                statusText: error.message,
            },
        }));
    });
};
// [END Save New MenuItem]

// Update MenuItem
// TODO: None
// [START Update MenuItem]
export const updateMenuItemMenuItem = () => ({
    type: 'UPDATE_MENUITEM_MENUITEM',
});


export const updateMenuItemSuccess = menuItem => ({
    type: 'UPDATE_MENUITEM_SUCCESS',
    payload: {
        menuItem,
    },
});

export const updateMenuItemFailure = error => ({
    type: 'UPDATE_MENUITEM_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const updateMenuItem = (employeeID, accountID, menuItem, redirectRoute) => (dispatch) => {
    dispatch(updateMenuItemMenuItem());
    const menuItemID = menuItem.menuItemID;
    if (!validateKey(menuItemID)) {
        errorAlert('Invalid MenuItem ID');
        dispatch(updateMenuItemFailure({
            response: {
                status: 403,
                statusText: 'Invalid MenuItem ID',
            },
        }));
        return;
    }

    if (!validateKey(accountID)) {
        errorAlert('Invalid Account ID');
        return;
    }

    const currentMenuItemInfo = menuItem;

    const accountRef = db().collection('Accounts').doc(accountID);
    const currentMenuItemRef = accountRef.collection('MenuItems').doc(menuItemID);
    let futureLegacyDocument = accountRef.collection('LegacyMenuItems').doc()

    const createdDate = new Date()

    return db().runTransaction(transaction => transaction.get(currentMenuItemRef).then((currentMenuItemSnapshot) => {
        if (!currentMenuItemSnapshot.exists) {
            throw 'MenuItem Does Not Exists';
        }

        transaction.set(futureLegacyDocument, currentMenuItemSnapshot.data())
        transaction.set(futureLegacyDocument, {'active': false, 'newMenuItemRef': currentMenuItemRef}, {merge: true})
        const oldDocRef = currentMenuItemSnapshot.data()['oldMenuItemRef']
        if (oldDocRef) {
            transaction.update(oldDocRef, {'newMenuItemRef': futureLegacyDocument})
        }
        currentMenuItemInfo.updatedDate = createdDate
        currentMenuItemInfo.oldMenuItemRef = futureLegacyDocument
        transaction.set(currentMenuItemRef, getMenuItemFromSnapshot(currentMenuItemInfo));

        return Promise.resolve({ currentMenuItemRef, currentMenuItemInfo });

    })).then((result) => {
        console.log('Transaction successfully committed!');
        // supplyMeAnalytic('update_menuItem_success', null);
        dispatch(updateMenuItemSuccess(result.currentMenuItemInfo));
        successAlert('Update MenuItem Success!');
        history.push(`/accounts/${accountID}/menuItems`)
    }).catch((error) => {
        console.log('Transaction failed: ', error.message || error);
        console.log(error.message || error);
        errorAlert(error.message || error);
        // supplyMeAnalytic('update_menuItem_failure', null);
        dispatch(updateMenuItemFailure({
            response: {
                status: 403,
                statusText: error.message || error,
            },
        }));
    });
};
// [END Update MenuItem]

// Delete MenuItem
// TODO: None
// [START Delete MenuItem]
export const deleteMenuItemMenuItem = () => ({
    type: 'DELETE_MENUITEM_MENUITEM',
});


export const deleteMenuItemSuccess = menuItem => ({
    type: 'DELETE_MENUITEM_SUCCESS',
    payload: {
        menuItem,
    },
});

export const deleteMenuItemFailure = error => ({
    type: 'DELETE_MENUITEM_FAILURE',
    payload: {
        status: error.response.status,
        statusText: error.response.statusText,
    },
});

export const deleteMenuItem = (employeeID, accountID, menuItem, redirectRoute) => (dispatch) => {

    dispatch(deleteMenuItemMenuItem());

    const menuItemID = menuItem.menuItemID;
    if (!validateKey(menuItemID)) {
        errorAlert('Invalid MenuItem ID');
        dispatch(updateMenuItemFailure({
            response: {
                status: 403,
                statusText: 'Invalid MenuItem ID',
            },
        }));
        return;
    }

    if (!validateKey(accountID)) {
        errorAlert('Invalid Account ID');
        return;
    }

    const accountRef = db().collection('Accounts').doc(accountID);
    const docRef = accountRef.collection('MenuItems').doc(menuItemID);

    const updatedDate = Date.now();
    docRef.update({ "active": false, "deleted": true, "updatedDate": updatedDate }).then(() => {
        dispatch(deleteMenuItemSuccess());
        history.push(`/accounts/${accountID}/menuItems`)
        // errorAlert(200, 'Delete Menu Item Success');
        // supplyMeAnalytic(employeeID, 'menuItem', 'deleteMenuItemSuccess');
    }).catch((error) => {
        // errorAlert(400, error.message || error);
        // supplyMeAnalytic(employeeID, 'menuItem', 'deleteMenuItemFailure');
        dispatch(deleteMenuItemFailure({
            response: {
                status: 400,
                statusText: error.message,
            },
        }));
    });
};
// [END Delete MenuItem]
