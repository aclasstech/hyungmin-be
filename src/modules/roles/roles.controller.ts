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
import { Public } from "~/common/decorators";
import { Roles } from "~/common/decorators/custom.decorator";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ROLE } from "~/constants/enum.constant";
import { ApiTags } from "@nestjs/swagger";
import { ApiResult } from "~/common/decorators/api-result.decorator";
import { RolesGuard } from "../auth/guard/roles.guard";
import { AuthenticationGuard } from "../auth/guard/authentication.guard";
import { Role } from "./schemas/role.schema";

@ApiTags("Roles")
@Controller("roles")
@UseInterceptors(ClassSerializerInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiResult({ type: [Role], isPage: true })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiResult({ type: [Role], isPage: true })
  @Get()
  findAll(@Query("offset") offset?: number, @Query("limit") limit?: number) {
    return this.rolesService.findAllRole(offset, limit);
  }

  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiResult({ type: [Role], isPage: true })
  @Get("/:id")
  findOneById(@Param("id") id: string) {
    return this.rolesService.findOneRoleById(id);
  }

  // @Public()
  // @UseGuards(AuthenticationGuard, RolesGuard)
  // @Roles(ROLE.ADMIN)
  // @ApiResult({ type: [Role], isPage: true })
  // @Put("/:id")
  // updateById(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.updateRoleById(id, updateRoleDto);
  // }

  // @Public()
  // @UseGuards(AuthenticationGuard, RolesGuard)
  // @Roles(ROLE.ADMIN)
  // @ApiResult({ type: [Role], isPage: true })
  // @Delete("/:id")
  // removeById(@Param("id") id: string) {
  //   return this.rolesService.deleteRoleById(id);
  // }

  // @Public()
  // @UseGuards(AuthenticationGuard, RolesGuard)
  // @Roles(ROLE.ADMIN)
  // @ApiResult({ type: [Role], isPage: true })
  // @Put("/restore/:id")
  // restoreById(@Param("id") id: string) {
  //   return this.rolesService.restoreRoleById(id);
  // }
}
