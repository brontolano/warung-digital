import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CashdrawerService } from './cashdrawer.service';
import { OpenShiftDto, CloseShiftDto } from './dto/cashdrawer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cashdrawer / Shift')
@Controller({ path: 'cashdrawer', version: '1' })
@UseGuards(JwtAuthGuard)
export class CashdrawerController {
  constructor(private service: CashdrawerService) {}

  @Post('open')
  @ApiOperation({ summary: 'Buka shift baru' })
  async open(@Body() dto: OpenShiftDto, @Query('user_id') user_id: string) {
    return this.service.openShift(dto, user_id);
  }

  @Post(':id/close')
  @ApiOperation({ summary: 'Tutup shift + hitung selisih' })
  async close(@Param('id') id: string, @Body() dto: CloseShiftDto) {
    return this.service.closeShift(dto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Riwayat shift' })
  async history(@Query('store_id') store_id: string) {
    return this.service.getHistory(store_id);
  }

  @Post(':id/petty-cash')
  @ApiOperation({ summary: 'Petty cash top-up / withdrawal' })
  async pettyCash(
    @Param('id') id: string,
    @Body() body: { type: string; amount: number; reason: string; user_id: string },
  ) {
    return { success: true };
  }
}