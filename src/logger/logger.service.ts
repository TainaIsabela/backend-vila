// log.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './logger.model';

@Injectable()
export class LoggerService {
  constructor(@InjectModel('Log') private readonly logModel: Model<Log>) {}

  async createLog(message: string): Promise<Log> {
    const newLog = new this.logModel({ message });
    return await newLog.save();
  }
}
