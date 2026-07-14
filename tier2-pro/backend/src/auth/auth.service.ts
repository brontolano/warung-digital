import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) {}

  async register(dto: any) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email sudah terdaftar');
    const hash = await bcrypt.hash(dto.password, 12);
    const user = this.userRepo.create({ email: dto.email, password_hash: hash, nama_warung: dto.nama_warung, nama_pemilik: dto.nama_pemilik, no_wa: dto.no_wa });
    const saved = await this.userRepo.save(user);
    return this.generateTokens(saved);
  }

  async login(dto: any) {
    const user = await this.userRepo.findOne({ where: { email: dto.email }, select: ['user_id', 'email', 'password_hash', 'role', 'nama_warung', 'nama_pemilik'] });
    if (!user) throw new UnauthorizedException('Email atau password salah');
    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Email atau password salah');
    return this.generateTokens(user);
  }

  async refresh(refresh_token: string) {
    try {
      // SEC-003 FIX: Validate refresh token with expiry, issue new pair
      const payload = this.jwtService.verify(refresh_token);
      const user = await this.userRepo.findOne({ where: { user_id: payload.sub, is_active: true } });
      if (!user) throw new UnauthorizedException('User tidak ditemukan');
      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Refresh token tidak valid atau expired');
    }
  }

  generateTokens(user: User) {
    const payload = { sub: user.user_id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: { user_id: user.user_id, email: user.email, nama_warung: user.nama_warung, nama_pemilik: user.nama_pemilik, role: user.role },
    };
  }
}
