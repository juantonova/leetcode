const Permissions = require('./consts/permissions');
const Roles = require('./consts/roles');  

const adminPermissions = Object.values(Permissions);
const userPermissions = [Permissions.READ_TASK, Permissions.CREATE_COMMENT];
const interviewerPermissions = [Permissions.READ_TASK, Permissions.READ_USER, Permissions.DELETE_TASK, Permissions.CREATE_COMMENT];


const usersList = [
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

module.exports = usersList;