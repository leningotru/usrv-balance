import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statusService.findOne(+id);
  }
}
