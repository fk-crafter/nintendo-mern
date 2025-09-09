import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: string, dto: CreateOrderDto): Promise<{
        products: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                stock: number;
                category: string;
                image: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: string;
    }>;
    getOrdersByUser(userId: string): Promise<({
        products: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                stock: number;
                category: string;
                image: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: string;
    })[]>;
    updateOrder(orderId: string, dto: UpdateOrderDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: string;
    }>;
    deleteOrder(userId: string, orderId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: string;
    }>;
}
