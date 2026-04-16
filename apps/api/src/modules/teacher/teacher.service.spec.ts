import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './repository/teacher.repository';
import { AppLogger } from '../../core/logger/logger.service';

describe('TeacherService', () => {
  let service: TeacherService;
  let repo: jest.Mocked<TeacherRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: TeacherRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
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

    service = module.get<TeacherService>(TeacherService);
    repo = module.get(TeacherRepository);
  });

  it('should create a teacher', async () => {
    const dto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      schoolId: '60d5ecb54f421b2d3c123456',
      availability: {
        workingDays: {},
        startTime: '08:00',
        endTime: '15:00',
        maxPeriodsPerDay: 4
      }
    };
    repo.create.mockResolvedValue(dto as any);

    const result = await service.create(dto as any);

    expect(result).toEqual(dto);
    expect(repo.create).toHaveBeenCalled();
  });
});