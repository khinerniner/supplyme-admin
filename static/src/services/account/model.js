export function toNewAccount() {
    return {
        accountID: null,
        name: null,
        accountType: 'retail',
        locations: [],
    };
}

export function toNewLocation() {
    return {
        locality: null,
        country: null,
        region: null,
        street1: null,
        street2: null,
        postal: null,
        location: null,
        placeID: null,
        name: null,
    };
}

export function getAccountFromSnapshot(account) {
    return {
        accountID: account.accountID,
        name: account.name,
        accountType: account.accountType,
        locations: account.locations,
    }
}

export function accountRowObject(account) {
    return {
        index: account.accountID,
        id: account.accountID,
        name: account.name,
        accountType: account.accountType,
        locations: account.locations,
    };
}
export function toNewAccountCode() {
    return {
        activationCode: null,
        accountID: null,
        ownerName: null,
        accountType: 'retailer',
        email: null,
        phoneNumber: null,
        valid: false,
        updatedDate: null,
        creationDate: null,
    };
}
export function accountCodeRowObject(accountCode) {
    return {
        index: accountCode.activationCode,
        id: accountCode.activationCode,
        accountID: accountCode.accountID,
        ownerName: accountCode.ownerName,
        accountType: accountCode.accountType,
        email: accountCode.email,
        phoneNumber: accountCode.phoneNumber,
        valid: accountCode.valid,
        updatedDate: accountCode.updatedDate,
        creationDate: accountCode.creationDate,
    };
}
