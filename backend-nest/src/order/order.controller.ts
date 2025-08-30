import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../auth/decorators/user.decorator";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User("id") userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findUserOrders(@User("id") userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") orderId: string,
    @User("id") userId: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, dto, userId);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteOrder(@User("id") userId: string, @Param("id") orderId: string) {
    return this.orderService.deleteOrder(userId, orderId);
  }
}
