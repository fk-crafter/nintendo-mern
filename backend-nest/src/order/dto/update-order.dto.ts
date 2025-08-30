import { IsEnum } from "class-validator";

export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
