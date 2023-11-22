import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  async findOne(id: number): Promise<Status> {
    try {
      const response = await axios.get(
        `https://status.free.beeceptor.com/id/${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data for status #${id}`);
    }
  }
}
