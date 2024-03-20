import { User } from '../models/user';
import { PermissionAction } from '../models/enums/permissions';
import { Role } from  '../models/enums/roles'

const adminPermissions = Object.values(PermissionAction);
const userPermissions = [PermissionAction.READ_TASK, PermissionAction.CREATE_COMMENT];
const interviewerPermissions = [PermissionAction.READ_TASK, PermissionAction.READ_USER, PermissionAction.DELETE_TASK, PermissionAction.CREATE_COMMENT];


export const users: User[] = [
    {
        id: 1,
        role: Role.ADMIN,
        name: "Юрий",
        login: 'admin',
        password: 'admin',
        permissions: adminPermissions
    },
    {
        id: 2,
        role: Role.USER,
        name: "Аркадий",
        login: 'user',
        password: 'user',
        rating: 5,
        permissions: userPermissions
    },
    {
        id: 3,
        role: Role.INTERVIEWER,
        name: "Василий",
        login: 'interviewer',
        password: 'interviewer',
        permissions: interviewerPermissions
    },
    {
        id: 4,
        role: Role.USER,
        name: "Виктория",
        login: 'user',
        password: 'user',
        rating: 4,
        permissions: userPermissions
    },
]