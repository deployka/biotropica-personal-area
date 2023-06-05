import type { SomeTask } from '../../@types/entities/Task';

import { add, convertDateToCalendarDayType, getCalendarPageDays } from './TaskCalendarHelper';

test('convertDateToCalendarDayType', () => {
  const period = getCalendarPageDays('2023-06-01T00:00:00Z');
  const now = new Date('2023-06-01T00:00:00Z');
  const tasks: SomeTask[] = [];

  const June1 = convertDateToCalendarDayType(period[3], now, tasks);
  const May31 = convertDateToCalendarDayType(period[2], now, tasks);

  expect(June1.day).toEqual(1);
  expect(June1.nameOfDay).toEqual('чт');
  expect(June1.isPast).toEqual(false);

  expect(May31.day).toEqual(31);
  expect(May31.nameOfDay).toEqual('ср');
  expect(May31.isPast).toEqual(true);
});

test('Simple test', () => {
  const a = 1;
  const b = 2;

  const result = add(a, b);

  expect(result).toEqual(3); // result === 3
});
