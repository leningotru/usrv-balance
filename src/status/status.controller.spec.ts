// status.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';

describe('StatusController', () => {
  let controller: StatusController;
  let statusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [StatusService],
    }).compile();

    controller = module.get<StatusController>(StatusController);
    statusService = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a status by id', async () => {
      const mockStatus: Status = { id: 1, code: 400 };
      const id: number = 1;

      jest.spyOn(statusService, 'findOne').mockResolvedValue(mockStatus);

      const result = await controller.findOne(id);

      expect(result).toEqual(mockStatus);
    });
  });
});
