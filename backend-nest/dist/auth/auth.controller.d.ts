import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
