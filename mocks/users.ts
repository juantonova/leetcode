import { User } from '../models/user';
import { Permissions } from '../models/consts/permissions';
import { Roles } from  '../models/consts/roles'

const adminPermissions: Permissions[] = Object.values(Permissions);
const userPermissions: Permissions[] = [Permissions.READ_TASK, Permissions.CREATE_COMMENT];
const interviewerPermissions: Permissions[] = [Permissions.READ_TASK, Permissions.READ_USER, Permissions.DELETE_TASK, Permissions.CREATE_COMMENT];


export const usersList: User[] = [
    {
        id: 1,
        role: Roles.ADMIN,
        name: "Юрий",
        login: 'admin',
        password: 'admin',
        permissions: adminPermissions
    },
    {
        id: 2,
        role: Roles.USER,
        name: "Аркадий",
        login: 'user',
        password: 'user',
        rating: 5,
        permissions: userPermissions
    },
    {
        id: 3,
        role: Roles.INTERVIEWER,
        name: "Василий",
        login: 'interviewer',
        password: 'interviewer',
        permissions: interviewerPermissions
    },
    {
        id: 4,
        role: Roles.USER,
        name: "Виктория",
        login: 'user',
        password: 'user',
        rating: 4,
        permissions: userPermissions
    },
]