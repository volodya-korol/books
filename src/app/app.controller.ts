import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { getTemplate } from 'src/common/templates/templates';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  info(@Res() res: Response) {
    res.set('Content-Type', 'text/html');
    res.send(getTemplate({ name: 'welcome' }));
  }
}
