export function toNewEmployee() {
    return {
        employeeID: null,
        permissionLevel: "server",
        active: false,
        deleted: false,
        createdTime: null,
        updatedTime: null,
        terms: false,
        termTime: null,
        privacy: false,
        privacyTime: null,
        mapAvatarImageUrl: null,
        thumbAvatarImageUrl: null,
        userName: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null
    }
}
export function employeeRowObject(employee) {
    return {
        index: employee.employeeID,
        id: employee.employeeID,
        name: `${employee.firstName} ${employee.lastName}`,
        permissionLevel: employee.permissionLevel,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        createdTime: employee.createdTime,
    };
}
export function toNewEmployeeCode() {
    return {
        activationCode: null,
        accountID: null,
        ownerName: 'Jenny Lewis',
        accountName: null,
        email: 'jenny@virtualtabs.org',
        permissionLevel: 'admin',
        phoneNumber: '155555555555',
        valid: false,
        updatedDate: null,
        createdTime: null,
    };
}
export function employeeCodeRowObject(employeeCode) {
    return {
        index: employeeCode.activationCode,
        id: employeeCode.activationCode,
        accountID: employeeCode.accountID,
        ownerName: employeeCode.ownerName,
        accountName: employeeCode.accountName,
        email: employeeCode.email,
        permissionLevel: employeeCode.permissionLevel,
        phoneNumber: employeeCode.phoneNumber,
        valid: employeeCode.valid,
        updatedDate: employeeCode.updatedDate || new Date(),
        createdTime: employeeCode.createdTime || new Date(),
    };
}
