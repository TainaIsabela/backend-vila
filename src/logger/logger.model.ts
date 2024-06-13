import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export interface Log extends mongoose.Document {
  message: string;
  timestamp: Date;
}
