export function tomatoTransform(tomatos: number, shortHours?: boolean) {
  const minutes = tomatos * 25;
  const hours = Math.floor(minutes / 60);
  const wholeHours = 60 * hours;
  return hours === 0 ?
    `${tomatos * 25} мин` :
    `${hours} ${shortHours ? 'ч' : 'час'} ${minutes - wholeHours} мин`;
}
