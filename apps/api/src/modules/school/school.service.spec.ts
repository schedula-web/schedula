import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { SchoolRepository } from './repository/school.repository';
import { AppLogger } from '../../core/logger/logger.service';

describe('SchoolService', () => {
  let service: SchoolService;
  let repo: jest.Mocked<SchoolRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolService,
        {
          provide: SchoolRepository,
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

    service = module.get<SchoolService>(SchoolService);
    repo = module.get(SchoolRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});