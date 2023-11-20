import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StatusService {
  async findOne(id: number) {
    try {
      const response = await axios.get(`https://mock-status.free.beeceptor.com/id/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for status #${id}`, error);
      throw new Error(`Error fetching data for status #${id}`);
    }
  }
}


