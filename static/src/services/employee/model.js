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
        phoneNumber: null,
        followers: 0,
        following: 0,
        merchantHash: null,
        signorAddress: null,
        isEther: false,
        posHash: null,
        apiKey: null
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
        isLoggedIn: employee.isLoggedIn,
        isActive: employee.isActive,
        unenrolled: employee.unenrolled,
        createdTime: employee.createdTime,
    };
}
export function toNewEmployeeCode() {
    return {
        activationCode: null,
        establishmentID: null,
        ownerName: 'Jenny Lewis',
        establishmentName: null,
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
        establishmentID: employeeCode.establishmentID,
        ownerName: employeeCode.ownerName,
        establishmentName: employeeCode.establishmentName,
        email: employeeCode.email,
        permissionLevel: employeeCode.permissionLevel,
        phoneNumber: employeeCode.phoneNumber,
        valid: employeeCode.valid,
        updatedDate: employeeCode.updatedDate || new Date(),
        createdTime: employeeCode.createdTime || new Date(),
    };
}
