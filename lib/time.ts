export function startOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

export function endOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function addDays(date: Date, days: number) {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
}

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function weekRange(date = new Date()) {
  const weekday = (date.getDay() + 6) % 7;
  const start = startOfDay(date);
  start.setDate(start.getDate() - weekday);
  const end = endOfDay(addDays(start, 6));
  return { start, end };
}

export function monthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

export function trailingDayRange(days: number, now = new Date()) {
  const end = endOfDay(now);
  const start = startOfDay(addDays(end, -(days - 1)));
  const dates: string[] = [];

  for (let i = 0; i < days; i += 1) {
    dates.push(dateKey(addDays(start, i)));
  }

  return { start, end, dates };
}
