import { IsNumber, IsString, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenShiftDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() store_id: string;
  @ApiProperty({ default: 0 }) @IsNumber() @IsOptional() opening_balance?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() notes?: string;
}

export class CloseShiftDto {
  @ApiProperty() @IsNumber() @Min(0) closing_balance: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() notes?: string;
}