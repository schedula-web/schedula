import { Test, TestingModule } from '@nestjs/testing';
import { TimetableFormatService } from './timetable-format.service';
import { TimetableFormatRepository } from './repository/timetable-format.repository';
import { TimeSlotRepository } from './repository/time-slot.repository';
import { AppLogger } from '../../core/logger/logger.service';

describe('TimetableFormatService', () => {
  let service: TimetableFormatService;
  let formatRepo: TimetableFormatRepository;
  let slotRepo: TimeSlotRepository;

  const mockFormatRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const mockSlotRepo = {
    create: jest.fn(),
    findByFormat: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimetableFormatService,
        { provide: TimetableFormatRepository, useValue: mockFormatRepo },
        { provide: TimeSlotRepository, useValue: mockSlotRepo },
        { provide: AppLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<TimetableFormatService>(TimetableFormatService);
    formatRepo = module.get<TimetableFormatRepository>(TimetableFormatRepository);
    slotRepo = module.get<TimeSlotRepository>(TimeSlotRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFormat', () => {
    it('should call formatRepo.create', async () => {
      const dto = { name: 'Morning Shift' };
      const schedulaId = 'school123';
      await service.createFormat(dto as any, schedulaId);
      expect(formatRepo.create).toHaveBeenCalledWith({ ...dto, schedulaId });
    });
  });

  describe('getFormats', () => {
    it('should call formatRepo.findAll', async () => {
      const schedulaId = 'school123';
      await service.getFormats(schedulaId);
      expect(formatRepo.findAll).toHaveBeenCalledWith(schedulaId);
    });
  });
});
