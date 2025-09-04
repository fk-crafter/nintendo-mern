"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "uploads"), {
        prefix: "/uploads/",
    });
    const allowedOrigins = ["http://localhost:3000"];
    if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL);
    }
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap().catch((err) => {
    console.error("Error while starting the app:", err);
});
//# sourceMappingURL=main.js.map