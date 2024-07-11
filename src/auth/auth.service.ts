import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService){}
  async create(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const compare = await bcrypt.compare(createAuthDto.password, user.password);
    if (!compare) {
      throw new HttpException('Password is not valid', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user, username: user._id };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(await this.verify(accessToken));
    
    return { accessToken, user };
  }
  async verify(accessToken: string) {
    try {
      const data = await this.jwtService.verify(accessToken);
      const user = this.userService.findOne(data.username);
      if (!user) {
        throw new Error();
      }
      return user;
    } catch (error) {
      throw new HttpException('Authentication Failed', HttpStatus.UNAUTHORIZED);
    }
    
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
