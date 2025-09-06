"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let GeoController = class GeoController {
    async search(q, limit = "5") {
        if (!q || q.trim().length < 3)
            return [];
        try {
            const resp = await axios_1.default.get("https://nominatim.openstreetmap.org/search", {
                params: { q, format: "json", addressdetails: 1, limit },
                headers: {
                    "User-Agent": "nintendo-mern-app/1.0 (contact: you@example.com)",
                    Referer: process.env.FRONTEND_URL ?? "http://localhost:3000",
                },
                timeout: 6000,
            });
            const suggestions = (resp.data ?? []).map((item) => ({
                display_name: item.display_name,
                lat: Number.parseFloat(item.lat),
                lon: Number.parseFloat(item.lon),
                address: {
                    city: item.address?.city,
                    state: item.address?.state,
                    postcode: item.address?.postcode,
                },
            }));
            return suggestions;
        }
        catch (err) {
            console.error("Error fetching address suggestions: ", err);
            throw new common_1.HttpException("Geo lookup failed", common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.GeoController = GeoController;
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)("q")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeoController.prototype, "search", null);
exports.GeoController = GeoController = __decorate([
    (0, common_1.Controller)("geo")
], GeoController);
//# sourceMappingURL=geo.controller.js.map