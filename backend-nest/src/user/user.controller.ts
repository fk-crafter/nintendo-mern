import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles("ADMIN")
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(":id")
  @Roles("ADMIN")
  updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Put(":id/role")
  @Roles("ADMIN")
  toggleUserRole(@Param("id") id: string) {
    return this.userService.toggleUserRole(id);
  }

  @Delete(":id")
  @Roles("ADMIN")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
