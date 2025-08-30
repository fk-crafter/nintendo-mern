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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, dto) {
        if (dto.products.length === 0) {
            throw new common_1.BadRequestException("Order must contain at least one product");
        }
        let totalPrice = 0;
        for (const item of dto.products) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product not found: ${item.productId}`);
            }
            totalPrice += product.price * item.quantity;
        }
        const order = await this.prisma.order.create({
            data: {
                userId,
                totalPrice,
                products: {
                    create: dto.products.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                products: { include: { product: true } },
            },
        });
        return order;
    }
    async getOrdersByUser(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async updateOrder(orderId, dto, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException("Order not found");
        }
        if (order.userId !== userId) {
            throw new common_1.BadRequestException("You can't update this order");
        }
        const updated = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: dto.status,
            },
        });
        return updated;
    }
    async deleteOrder(userId, orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order || order.userId !== userId) {
            throw new common_1.NotFoundException("Order not found or access denied");
        }
        return this.prisma.order.delete({
            where: { id: orderId },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map