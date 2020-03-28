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
        createdDate: employee.createdDate,
    };
}
export function toNewEmployeeCode() {
    return {
        activationCode: null,
        accountID: null,
        ownerName: null,
        accountName: null,
        email: null,
        permissionLevel: null,
        phoneNumber: null,
        valid: false,
        updatedDate: null,
        createdDate: null,
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
        createdDate: employeeCode.createdDate || new Date(),
    };
}
