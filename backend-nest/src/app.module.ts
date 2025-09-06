import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import { StatsModule } from "./stats/stats.module";
import { UserModule } from "./user/user.module";
import { UploadModule } from "./upload/upload.module";
import { GeoModule } from "./geo/geo.module";

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProductModule,
    OrderModule,
    StatsModule,
    UserModule,
    UploadModule,
    GeoModule,
  ],
})
export class AppModule {}
