import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './repository/subject.repository';

describe('SubjectService', () => {
  let service: SubjectService;

  const mockRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findBySchedulaId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        { provide: SubjectRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  it('should create subject', async () => {
    mockRepo.create.mockResolvedValue({ subjectName: 'Math' });

    const result = await service.create(
      {
        subjectName: 'Math',
        periodsPerWeek: 5,
        maxPeriodsPerDay: 2,
        applicableGrade: 10,
      } as any,
      'SCH1',
    );

    expect(result.subjectName).toBe('Math');
  });
});