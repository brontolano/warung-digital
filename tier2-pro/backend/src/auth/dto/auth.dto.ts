import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
export class RegisterDto { @IsEmail() email: string; @IsString() @MinLength(3) nama_warung: string; @IsString() @MinLength(3) nama_pemilik: string; @IsString() @IsOptional() no_wa?: string; @IsString() @MinLength(6) password: string; }
export class LoginDto { @IsEmail() email: string; @IsString() password: string; }
