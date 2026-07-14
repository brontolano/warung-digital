import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionItemDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() product_id: string;
  @ApiProperty({ default: 1 }) @IsNumber() @Min(1) qty: number;
  @ApiProperty() @IsNumber() @Min(0) unit_price: number;
  @ApiProperty({ default: 'HET' }) @IsString() @IsOptional() tier_name?: string;
}

export class CreateTransactionDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() store_id: string;
  @ApiProperty({ type: [TransactionItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => TransactionItemDto) items: TransactionItemDto[];
  @ApiProperty({ default: 'cash' }) @IsString() @IsOptional() payment_method?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() notes?: string;
}
