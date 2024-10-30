import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const usuario = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(usuario);
      delete usuario.password;
      return {
        ...usuario,
        token: this.getJwtToken({ id: usuario.id }),
      };
    } catch (e) {
      this.handleDBError(e);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const usuario = await this.userRepository.findOne({
      where: { email },
      select: ['password', 'email', 'id'],
    });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
    if (!bcrypt.compareSync(password, usuario.password)) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
    delete usuario.password;
    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id }),
    };
  }

  public async checkAuthStatus(usuario: User) {
    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException(error.detail);
  }
}
