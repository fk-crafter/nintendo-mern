import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalUsers = await this.prisma.user.count();
    const totalProducts = await this.prisma.product.count();
    const totalOrders = await this.prisma.order.count();

    const revenueAgg = await this.prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
    });

    const totalRevenue = revenueAgg._sum.totalPrice ?? 0;

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    };
  }
}
