import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(userId: string, dto: CreateOrderDto): Promise<{
        products: ({
            product: {
                id: string;
                name: string;
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
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
    }>;
    findUserOrders(userId: string): Promise<({
        products: ({
            product: {
                id: string;
                name: string;
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
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
    })[]>;
    update(orderId: string, userId: string, dto: UpdateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
    }>;
    deleteOrder(userId: string, orderId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
    }>;
}
