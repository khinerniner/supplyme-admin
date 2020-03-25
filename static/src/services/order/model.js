import { parseFirestoreTimeStamp } from '../../utils/misc';
import { toNewLocation } from '../../services/location/model';
import { toNewMenuItem } from '../../services/menuItem/model';

export function getOrderFromSnapshot(order) {
    return {
        orderID: order.orderID,
        active: order.active,
        deleted: order.deleted,
        priority: order.priority,
        requiredBy: order.requiredBy,
        status: order.status,
        location: order.location,
        menuItems: order.menuItems,
    };
}
export function toNewOrder() {
    return {
        orderID: null,
        active: false,
        deleted: false,
        priority: 'low',
        requiredBy: null,
        status: {
            isStatus: 0,
            isStatusTime: null,
            events: [],
        },
        location: toNewLocation(),
        menuItems: [],
    };
}
export function toNewOrderItem() {
    return {
        quantity: 0,
        item: toNewMenuItem(),
    };
}
export function orderRowObject(order) {
    return {
        index: order.orderID,
        id: order.orderID,
        active: order.active,
        deleted: order.deleted,
        priority: order.priority,
        requiredBy: order.requiredBy,
        isStatus: order.status.isStatus,
        locationName: order.location.name,
        numItems: order.menuItems.length,
    };
}
