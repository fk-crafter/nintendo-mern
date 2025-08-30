interface JwtUser {
    id: string;
    sub: string;
    email?: string;
    role?: string;
}
export declare const User: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof JwtUser | undefined)[]) => ParameterDecorator;
export {};
