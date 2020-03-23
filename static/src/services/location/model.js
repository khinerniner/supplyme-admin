import { parseFirestoreTimeStamp } from '../../utils/misc';

export function getLocationFromSnapshot(location) {
    return {
        locationID: location.locationID,
        active: location.active,
        deleted: location.deleted,
        name: location.name,
        email: location.email,
        phoneNumber: location.phoneNumber,
        properties: location.properties,
        updatedDate: parseFirestoreTimeStamp(location.updatedDate),
        createdDate: parseFirestoreTimeStamp(location.createdDate),
    };
}
export function toNewLocation() {
    return {
        locationID: null,
        active: false,
        deleted: false,
        locality: null,
        country: null,
        region: null,
        street1: null,
        street2: null,
        postal: null,
        location: null,
        geohash: null,
        placeID: null,
        name: null,
        phoneNumber: null,
        updatedDate: null,
        createdDate: null,
    };
}
export function locationRowObject(location) {
    return {
        index: location.locationID,
        id: location.locationID,
        active: location.active,
        deleted: location.deleted,
        address: `${location.locality} ${location.region}, ${location.country}`,
        name: location.name,
        phoneNumber: location.phoneNumber,
        updatedDate: location.updatedDate,
        createdDate: location.createdDate,
    };
}
