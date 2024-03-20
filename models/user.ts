import { PermissionAction } from "./enums/permissions";
import { Role } from "./enums/roles"

export type User = {
    id: number
    role: Role
    name: string
    login: string
    password: string
    rating?: number
    permissions: PermissionAction[]
}