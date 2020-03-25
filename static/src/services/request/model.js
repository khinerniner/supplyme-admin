import { parseFirestoreTimeStamp } from '../../utils/misc';
import { toNewLocation } from '../../services/location/model';

export function getRequestFromSnapshot(request) {
    return {
        requestID: request.requestID,
        active: request.active,
        deleted: request.deleted,
        priority: request.priority,
        requiredBy: request.requiredBy,
        status: request.status,
    };
}
export function toNewRequest() {
    return {
        requestID: null,
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
        items: [],
    };
}
export function requestRowObject(request) {
    return {
        index: request.requestID,
        id: request.requestID,
        active: request.active,
        deleted: request.deleted,
        priority: request.priority,
        requiredBy: request.requiredBy,
        status: request.status,
    };
}
