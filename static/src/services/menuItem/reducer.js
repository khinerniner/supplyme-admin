import { combineReducers } from 'redux';
import { getMenuItemFromSnapshot } from './model';

const addMenuItem = (state, action) => {
    switch (action.type) {
        case 'ADD_MENUITEM':
          return getMenuItemFromSnapshot(action)
        default:
            return state
    }
}

const menuItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MENUITEM':
            if (state.map(menuItem => menuItem.itemID).includes(action.itemID)) {
              return [
                addMenuItem(undefined, action)
              ]
            }else{
                return [
                  ...state,
                  addMenuItem(undefined, action)
                ]
            }
        default:
            return state
    }
};

const receivedAt = (state = null, action) => {
    switch (action.type) {
    case 'UNMOUNT_MENUITEMS_LISTENER_MENUITEM':
        return null;
    case 'START_FETCHING_MENUITEMS':
        return state;
    case 'ADD_MENUITEM':
        return null;
    case 'RECEIVED_MENUITEMS':
        return Date.now();

    default:
        return state;
    }
};

const menuItemData = combineReducers({
    menuItems,
    receivedAt,
});

export default menuItemData;
