import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './srategies/jwt.strategy';
import { User } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // esta es la forma de registrar el módulo de manera asíncrona, es decir
    // cuando esté listo el modulo, se carga
    JwtModule.registerAsync({
      imports: [], // puedo importar otro modulo
      inject: [], // puedo inyectar algún servicio de ese modulo importado
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
    // esta es una forma de regristrar el modulo de manera síncrónica, lo normal
    // JwtModule.register({
    //   secret: process.env.jwt_SECRET,
    //   signOptions: { expiresIn: '2h' },
    // }),
  ],
  // exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
