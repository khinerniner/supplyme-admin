
export function toNewVeriDocAddress() {
    return {
        active: false,
        locality: null,
        country: null,
        region: null,
        street1: null,
        street2: null,
        postal: null,
        location: null,
        geohash: null,
        placeID: null,
    };
}
export function toNewHospital() {
    return {
        hospitalID: null,
        active: false,
        deleted: false,
        createdTime: null,
        updatedTime: null,
        name: null,
        email: null,
        phoneNumber: null,
        address: toNewVeriDocAddress(),
        timezone: null,
        website: null,
        maxOccupancy: null,
    };
}
export function getHospitalFromSnapshot(hospital) {
    return {
        hospitalID: hospital.hospitalID,
        active: hospital.active,
        deleted: hospital.deleted,
        createdTime: hospital.createdTime,
        updatedTime: hospital.updatedTime,
        name: hospital.name,
        email: hospital.email,
        phoneNumber: hospital.phoneNumber,
        address: hospital.address,
        timezone: hospital.timezone,
        website: hospital.website,
        maxOccupancy: hospital.maxOccupancy,
    };
}

export function toNewHospitalLoc() {
    return {
        active: false,
        deleted: false,
        createdTime: null,
        updatedTime: null,
        geohash: null,
        location: null,
        radius: null,
        identifier: null,
        note: null,
        cap: null,
        categories: [],
        image: null,
    };
}
export function getHospitalLocFromSnapshot(hospitalLoc) {
    return {
        active: hospitalLoc.active,
        deleted: hospitalLoc.deleted,
        createdTime: hospitalLoc.createdTime,
        updatedTime: hospitalLoc.updatedTime,
        geohash: hospitalLoc.geohash,
        location: hospitalLoc.location,
        radius: hospitalLoc.radius,
        identifier: hospitalLoc.hospitalLocID,
        note: hospitalLoc.note,
        cap: hospitalLoc.cap,
        categories: hospitalLoc.categories,
        image: hospitalLoc.image,
    };
}
export function hospitalRowObject(hospital) {
    return {
        index: hospital.hospitalID,
        id: hospital.hospitalID,
        name: hospital.name,
        active: hospital.active,
        updatedTime: hospital.updatedTime,
        phoneNumber: hospital.phoneNumber,
    };
}
export function toNewHospitalCode() {
    return {
        activationCode: null,
        accountID: null,
        accountType: 'hospital',
        ownerName: null,
        hospitalName: null,
        email: null,
        phoneNumber: null,
        valid: false,
        updatedTime: null,
        createdTime: null,
    };
}
export function hospitalCodeRowObject(hospitalCode) {
    return {
        index: hospitalCode.activationCode,
        id: hospitalCode.activationCode,
        accountID: hospitalCode.accountID,
        accountType: hospitalCode.accountType,
        ownerName: hospitalCode.ownerName,
        hospitalName: hospitalCode.hospitalName,
        email: hospitalCode.email,
        phoneNumber: hospitalCode.phoneNumber,
        valid: hospitalCode.valid,
        updatedTime: hospitalCode.updatedTime || new Date(),
        createdTime: hospitalCode.createdTime || new Date(),
    };
}
