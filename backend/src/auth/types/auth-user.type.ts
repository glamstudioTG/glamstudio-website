import { Role } from "@prisma/client";

export type AuthUser = {
    id: string;
    email: string;
    role: Role
};