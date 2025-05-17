import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, { secret: 'secretKey' }); // asegúrate que es el mismo usado en AuthModule
      request.user = decoded;

      if (!requiredRoles || requiredRoles.length === 0) return true;

      return decoded.role?.some((r: any) => requiredRoles.includes(r.descripcion));
    } catch {
      return false;
    }
  }
}
