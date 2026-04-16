import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { AppLogger } from '../../core/logger/logger.service';

describe('TeacherController', () => {
  let controller: TeacherController;
  let service: jest.Mocked<TeacherService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AppLogger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    service = module.get(TeacherService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CREATE
  it('should create a teacher', async () => {
    const dto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      schoolId: '60d5ecb54f421b2d3c123456',
    };
    const result = { _id: '1', ...dto };

    service.create.mockResolvedValue(result as any);

    expect(await controller.create(dto as any)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // ✅ FIND ALL
  it('should return all teachers', async () => {
    const result = [{ _id: '1', fullName: 'John Doe' }];

    service.findAll.mockResolvedValue(result as any);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  // ✅ FIND ONE
  it('should return a teacher by id', async () => {
    const result = { _id: '1', fullName: 'John Doe' };

    service.findOne.mockResolvedValue(result as any);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  // ✅ UPDATE
  it('should update a teacher', async () => {
    const dto = { name: 'Updated' };
    const result = { _id: '1', ...dto };

    service.update.mockResolvedValue(result as any);

    expect(await controller.update('1', dto as any)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  // ✅ DELETE
  it('should delete a teacher', async () => {
    const result = { _id: '1', name: 'John' };

    service.remove.mockResolvedValue(result as any);

    expect(await controller.remove('1')).toEqual(result);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});