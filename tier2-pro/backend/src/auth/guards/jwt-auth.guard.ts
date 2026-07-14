import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable() export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService, private configService: ConfigService, @InjectRepository(User) private userRepo: Repository<User>) { super(); }
}
