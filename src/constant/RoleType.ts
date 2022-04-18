export enum RoleType {
    ADMIN = 0,
    DEVELOPER = 1,
    USER = 2,
    SUPER_ADMIN = 3
}

export const DEFAULT_ROLE_TYPE: RoleType = RoleType.USER;

export function getRoleTypeWeight(roleType: RoleType) {
    const weight = {
        0: 1000,
        1: 666,
        2: 1,
        3: 9999
    };
    const roleWeight = weight[roleType] !== undefined ? weight[roleType] : 1;
    return roleWeight;
}
