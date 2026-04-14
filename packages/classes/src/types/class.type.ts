export interface Class {
  _id?: string;
  grade: string;
  section: string;
  className: string;
  classTeacher?: string;
  numberOfStudents?: number;

  subjects?: string[];
  workingDays?: string[];
  periodsPerDay?: number;
  maxPeriodsPerDay?: number;
  roomId?: string;
  capacity?: number;
  status?: string;
  schoolId?: string;
}