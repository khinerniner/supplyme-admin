import { parseFirestoreTimeStamp } from '../../utils/misc';
import { toNewLocation } from '../../services/location/model';
import { toNewMenuItem } from '../../services/menuItem/model';

export function getRequestFromSnapshot(request) {
    return {
        requestID: request.requestID,
        active: request.active,
        deleted: request.deleted,
        priority: request.priority,
        budget: request.budget,
        requiredBy: parseFirestoreTimeStamp(request.requiredBy),
        status: request.status,
        location: request.location,
        menuItems: request.menuItems,
    };
}
export function toNewRequest() {
    return {
        requestID: null,
        active: false,
        deleted: false,
        priority: 'low',
        budget: 0,
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
export function toNewRequestItem() {
    return {
        quantity: 0,
        item: toNewMenuItem(),
    };
}
export function requestRowObject(request) {
    return {
        index: request.requestID,
        id: request.requestID,
        active: request.active,
        deleted: request.deleted,
        budget: request.budget,
        priority: request.priority,
        requiredBy: request.requiredBy,
        isStatus: request.status.isStatus,
        locationName: request.location.name,
        numItems: request.menuItems.length,
    };
}
