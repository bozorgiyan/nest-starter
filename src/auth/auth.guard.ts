import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new Error();
      }
      const user = await this.authService.verify(token);
      request['user'] = user;
      return true;
    } catch (error) {
      throw new HttpException('Authorization Failed', HttpStatus.UNAUTHORIZED);
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
