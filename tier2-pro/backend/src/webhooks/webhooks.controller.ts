import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'; import { ApiTags } from '@nestjs/swagger';
@ApiTags('Webhooks') @Controller('v1/webhooks')
export class WebhooksController {
  @Post('n8n/order-created') @HttpCode(HttpStatus.OK) n8nOrder(@Body() b: any) { return { success: true, message: 'Workflow triggered' }; }
  @Post('n8n/daily-report') @HttpCode(HttpStatus.OK) n8nReport(@Body() b: any) { return { success: true }; }
  @Post('waha/incoming') @HttpCode(HttpStatus.OK) wahaIncoming(@Body() b: any) { console.log('WAHA incoming:', b); return { success: true }; }
}
