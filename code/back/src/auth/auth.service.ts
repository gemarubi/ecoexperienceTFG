import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(correo: string, pass: string) {
        const user = await this.usersService.findEmail(correo);
    
        if (!user || ! user.pass ){
            throw new UnauthorizedException('Invalid credentials');
        }
    
        console.log(user);
        console.log('User password:', user.pass);
        console.log('Input password:', pass);
    
        if (pass === user.pass) {
            const { pass, ...result } = user;
            console.log(result);
            return result;
        }
    
        throw new UnauthorizedException('Invalid credentials');
    }

    async getRoles (id_user:number){
        const roles= await this.usersService.findAllRolesOfUser(id_user)
        return roles
    }
    async login(user: User,roles:Role[]) {
        const payload = { email: user, sub: user.id, role: roles };
        return {
          token: this.jwtService.sign(payload),
        };
      }
    
}
