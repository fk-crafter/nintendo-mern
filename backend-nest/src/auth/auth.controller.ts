import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import type { Response, Request as ExpressRequest } from "express";

interface JwtPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface AuthRequest {
  user: JwtPayload;
}

interface OAuthUser {
  token: string;
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

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleCallback(@Req() req: ExpressRequest, @Res() res: Response) {
    const { token } = req.user as OAuthUser;
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}`,
    );
  }

  @Get("github")
  @UseGuards(AuthGuard("github"))
  async githubAuth() {}

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
  githubCallback(@Req() req: ExpressRequest, @Res() res: Response) {
    const { token } = req.user as OAuthUser;
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}`,
    );
  }
}
