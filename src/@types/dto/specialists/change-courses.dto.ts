import { Course } from '../../entities/Specialist';

export type ChangeCourseDto = {
  courses: Omit<Course, 'id'>[];
};
