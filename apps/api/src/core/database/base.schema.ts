import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class BaseSchema {
  _id!: Types.ObjectId;
  createdAt!: Date;
  updatedAt!: Date;
}