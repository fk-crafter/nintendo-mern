import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            name: string;
            email: string;
            id: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
}
