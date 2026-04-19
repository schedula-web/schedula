import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from './schema/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const createdSubject = new this.subjectModel(createSubjectDto);
    return createdSubject.save();
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectModel.find().exec();
  }

  async findOne(id: string): Promise<Subject | null> {
    return this.subjectModel.findById(id).exec();
  }

  async update(id: string, updateSubjectDto: Partial<CreateSubjectDto>): Promise<Subject | null> {
    return this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Subject | null> {
    return this.subjectModel.findByIdAndDelete(id).exec();
  }
}

