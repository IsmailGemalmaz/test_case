"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleTypeWeight = exports.DEFAULT_ROLE_TYPE = exports.RoleType = void 0;
var RoleType;
(function (RoleType) {
    RoleType[RoleType["ADMIN"] = 0] = "ADMIN";
    RoleType[RoleType["DEVELOPER"] = 1] = "DEVELOPER";
    RoleType[RoleType["USER"] = 2] = "USER";
    RoleType[RoleType["SUPER_ADMIN"] = 3] = "SUPER_ADMIN";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
exports.DEFAULT_ROLE_TYPE = RoleType.USER;
function getRoleTypeWeight(roleType) {
    const weight = {
        0: 1000,
        1: 666,
        2: 1,
        3: 9999
    };
    const roleWeight = weight[roleType] !== undefined ? weight[roleType] : 1;
    return roleWeight;
}
exports.getRoleTypeWeight = getRoleTypeWeight;
//# sourceMappingURL=RoleType.js.map