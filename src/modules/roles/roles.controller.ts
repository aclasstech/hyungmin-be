import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Query,
  Put,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { GROUP_ROLE, RoleEntity } from "./entities/role.entity";
import { Public } from "~/common/decorators";
import { Roles } from "~/common/decorators/custom.decorator";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ROLE } from "~/constants/enum.constant";
import { ApiTags } from "@nestjs/swagger";
import { ApiResult } from "~/common/decorators/api-result.decorator";
import { RolesGuard } from "../auth/guard/roles.guard";
import { AuthenticationGuard } from "../auth/guard/authentication.guard";

@ApiTags("Roles")
@Controller("roles")
@UseInterceptors(ClassSerializerInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   *
   * @api Tạo role
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns role details
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  /**
   *
   * @api Truy vấn tất cả roles
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns tất cả role details
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Get()
  findAll(@Query("offset") offset?: number, @Query("limit") limit?: number) {
    return this.rolesService.findAllRole(offset, limit);
  }

  /**
   *
   * @api Truy vấn 1 role bằng id
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns role details
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Get("/by-id/:id")
  findOneById(@Param("id") id: string) {
    return this.rolesService.findOneRoleById(id);
  }

  /**
   *
   * @api Truy vấn 1 role bằng tên
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns role details
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Get("/by-name/:name")
  findOneByName(@Param("name") name: string) {
    return this.rolesService.findOneRoleByName(name);
  }

  /**
   *
   * @api Cập nhật role bằng id
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Put("/by-id/:id")
  updateById(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRoleById(id, updateRoleDto);
  }

  /**
   *
   * @api Cập nhật role bằng tên
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Put("/by-name/:name")
  updateByName(
    @Param("name") name: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.rolesService.updateRoleByName(name, updateRoleDto);
  }

  /**
   *
   * @api Xóa role bằng id
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Delete("/by-id/:id")
  removeById(@Param("id") id: string) {
    return this.rolesService.deleteRoleById(id);
  }

  /**
   *
   * @api Xóa role bằng tên
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Delete("/by-name/:name")
  removeByName(@Param("name") name: string) {
    return this.rolesService.deleteRoleByName(name);
  }

  /**
   *
   * @api Khôi phục role bằng id
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Put("/restore/by-id/:id")
  restoreById(@Param("id") id: string) {
    return this.rolesService.restoreRoleById(id);
  }

  /**
   *
   * @api Khôi phục role bằng tên
   * @guard Chỉ khi đăng nhập và có role là kỹ thuật viên mới có quyền truy cập
   * @public Public: Decorator cho phép truy cập mà không cần đăng nhập
   * @returns
   */
  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.TECHNICIAN)
  @SerializeOptions({ groups: [GROUP_ROLE] })
  @ApiResult({ type: [RoleEntity], isPage: true })
  @Put("/restore/by-name/:name")
  restoreByName(@Param("name") name: string) {
    return this.rolesService.restoreRoleByName(name);
  }
}
