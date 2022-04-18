export declare enum RoleType {
    ADMIN = 0,
    DEVELOPER = 1,
    USER = 2,
    SUPER_ADMIN = 3
}
export declare const DEFAULT_ROLE_TYPE: RoleType;
export declare function getRoleTypeWeight(roleType: RoleType): number;
