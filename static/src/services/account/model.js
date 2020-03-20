export function toNewAccount() {
    return {
        activationCode: null,
        creationDate: null,
        email: '',
        accountID: null,
        employmentDate: null,
        isActive: false,
        isLoggedIn: false,
        isOnline: false,
        name: null,
        oldAccountRef: null,
        permissionLevel: 'user',
        phoneNumber: null,
        unenrolled: null,
        updatedDate: null,
    };
}
export function accountRowObject(account) {
    return {
        index: account.accountID,
        id: account.accountID,
        name: account.name,
        permissionLevel: account.permissionLevel,
        email: account.email,
        phoneNumber: account.phoneNumber,
        isActive: account.isActive,
        unenrolled: account.unenrolled,
        creationDate: account.creationDate,
    };
}
export function toNewAccountCode() {
    return {
        activationCode: null,
        accountID: null,
        accountName: null,
        ownerName: null,
        email: '',
        permissionLevel: 'user',
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
        permissionLevel: accountCode.permissionLevel,
        phoneNumber: accountCode.phoneNumber,
        valid: accountCode.valid,
        updatedDate: accountCode.updatedDate,
        creationDate: accountCode.creationDate,
    };
}
