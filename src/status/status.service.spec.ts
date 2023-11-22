// status.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Status } from './entities/status.entity';

describe('StatusService', () => {
  let service: StatusService;
  let axiosMock: MockAdapter;
  const id: number = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = module.get<StatusService>(StatusService);
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch status by id', async () => {
    const mockStatus: Status = { id: 1, code: 245 };

    axiosMock
      .onGet(`https://status.free.beeceptor.com/id/${id}`)
      .reply(200, mockStatus);

    const result = await service.findOne(id);

    expect(result).toEqual(mockStatus);
  });

  it('should handle error when fetching status by id', async () => {
    axiosMock
      .onGet(`https://status.free.beeceptor.com/id/${id}`)
      .reply(500, 'Internal Server Error');

    await expect(service.findOne(id)).rejects.toThrowError(
      'Error fetching data for status #1',
    );
  });
});
