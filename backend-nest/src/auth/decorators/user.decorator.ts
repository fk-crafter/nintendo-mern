import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface JwtUser {
  id: string;
  sub: string;
  email?: string;
  role?: string;
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

export const User = createParamDecorator(
  (field: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    return field ? user?.[field] : user;
  },
);
