import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

interface JwtPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface AuthRequest {
  user: JwtPayload;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  getProtected(@Request() req: AuthRequest) {
    return {
      message: "Access granted to protected route ✅",
      user: req.user,
    };
  }

  @Post("register-social")
  registerSocial(
    @Body() body: { name?: string; email: string; image?: string },
  ) {
    return this.authService.registerSocial(body);
  }
}
