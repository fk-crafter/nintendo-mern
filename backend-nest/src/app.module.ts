import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [AuthModule, PrismaModule, ProductModule],
})
export class AppModule {}
