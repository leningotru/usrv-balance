import { Controller, Get, Param } from '@nestjs/common';
import { Status } from './entities/status.entity';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get(':id')
  findOne(@Param('id') id: number):Promise<Status> {
    return this.statusService.findOne(+id);
  }
}
