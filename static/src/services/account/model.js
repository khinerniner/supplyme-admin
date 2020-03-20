
export function toNewAccount() {
    return {
        name: null,
        accountID: null,
        smartbnb: {
            isActive: false,
            clientID: null,
            clientSecret: null,
            hasMigrated: false,
            updatedDate: false,
        },
        seasons: [],
        seasonModifier: {},
        firesale: [],
        dow: {},
        dowModifier: [],
        base: {
            amount: null,
            days: null,
            limit: null
        },
        min: {
            amount: null,
            days: null,
            limit: null
        },
        terms: false,
        termTime: null,
    };
}

export function getAccountFromSnapshot(account) {
    return {
        accountID: account.accountID,
        name: account.name,
        smartbnb: account.smartbnb || {},
        seasons: account.seasons || [],
        seasonModifier: account.seasonModifier || {},
        firesale: account.firesale || [],
        dow: account.dow || [],
        dowModifier: account.dowModifier || [],
        base: account.base || {},
        min: account.min || {},
        terms: account.terms || false,
        termTime: account.termTime || null
    }
}

export function accountRowObject(account) {
    return {
        index: account.accountID,
        id: account.accountID,
        name: account.name,
        smartbnbisActive: account.smartbnb.isActive,
        smartbnbHasMigrated: account.smartbnb.hasMigrated,
        smartbnbHasMigratedTime: account.smartbnb.updatedDate,
    };
}
export function toNewAccountCode() {
    return {
        activationCode: null,
        accountID: null,
        ownerName: null,
        accountName: null,
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
        accountName: accountCode.accountName,
        email: accountCode.email,
        phoneNumber: accountCode.phoneNumber,
        valid: accountCode.valid,
        updatedDate: accountCode.updatedDate,
        creationDate: accountCode.creationDate,
    };
}
