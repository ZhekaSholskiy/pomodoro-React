export function getToday(day?:number) {
  let dayName;
  switch(day || day === 0 ? day : new Date().getDay()) {
    case 0: dayName = 'Воскресенье';
    break;
    case 1: dayName = 'Понедельник';
    break;
    case 2: dayName = 'Вторник';
    break;
    case 3: dayName = 'Среда';
    break;
    case 4: dayName = 'Четверг';
    break;
    case 5: dayName = 'Пятница';
    break;
    case 6: dayName = 'Суббота';
    break;
  }

  return dayName;
}
