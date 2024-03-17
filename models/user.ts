import { Permissions } from "./consts/permissions";
import { Roles } from "./consts/roles"

export type User = {
    id: number,
    role: Roles,
    name: string,
    login: string,
    password: string,
    rating?: number,
    permissions: Permissions[];
}