// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UsersService } from "src/api/auth/apps/users/users.service";

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private userService: UsersService,
// 	) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     // const { user } = context.switchToHttp().getRequest();
//     const user = this.userService.findById(userId)
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }
