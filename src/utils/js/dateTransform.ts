
// в зависимости от времени функция выбирает часов/минут
export function handleTime(dateNum: number, perfmance: string ,inputDateType?: string) {
  const inputDate = new Date(dateNum);
  const tzOffset = inputDate.getTimezoneOffset() * 60000;
  const dateDif = new Date(inputDate.getTime() + tzOffset);
  console.log(dateDif)

  const time = [{dateValue: dateDif.getFullYear () - 1970, dateType: 'year'},
                {dateValue: dateDif.getMonth(), dateType: 'month'},
                {dateValue: dateDif.getDate(), dateType: 'day'},
                {dateValue: dateDif.getHours(), dateType: 'hour'},
                {dateValue: dateDif.getMinutes(), dateType: 'minute'},
                {dateValue: dateDif.getSeconds(), dateType: 'second'},
  ].find(el => {
    if (inputDateType) {
      return el.dateType === inputDateType;
    } else {
      return el.dateValue !== 0;
    }
  });

  let handledTime = '';
  const dates = perfmance === 'default' ? {
    moreTen: {'second': 'секунд', 'minute': 'минут', 'hour': 'часов', 'day': 'дней', 'month': 'месяцев',  'year': 'лет'},
    moreOne: {'second': 'секунды', 'minute': 'минуты', 'hour': 'часа', 'day': 'дня', 'month': 'месяца', 'year': 'года'},
    one: {'second': 'секунда', 'minute': 'минута', 'hour': 'час', 'day': 'день', 'month': 'месяц', 'year': 'год'},
  } :
  {
    moreTen: {'second': 'секунд', 'minute': 'минут', 'hour': 'часов', 'day': 'дней', 'month': 'месяцев',  'year': 'лет'},
    moreOne: {'second': 'секунд', 'minute': 'минут', 'hour': 'часов', 'day': 'дней', 'month': 'месяцев', 'year': 'лет'},
    one: {'second': 'секунды', 'minute': 'минуты', 'hour': 'часа', 'day': 'дня', 'month': 'месяца', 'year': 'года'},
  };

  let returnedValue = '';
  if(time) {
    const timeString = String(time.dateValue);
    const dateType = time.dateType;
    ['11', '12', '13', '14'].includes(timeString.slice(-2)) ?
    handledTime = dates.moreTen[dateType as keyof typeof dates.moreTen]:
    ['2', '3', '4'].includes(timeString.slice(-1)) ?
    handledTime = dates.moreOne[dateType as keyof typeof dates.moreOne]:
    timeString.slice(-1) === '1' ?
    handledTime = dates.one[dateType as keyof typeof dates.one]:
    handledTime = dates.moreTen[dateType as keyof typeof dates.moreTen];

    returnedValue = `${time.dateValue} ${handledTime}`;
  }
  return returnedValue;
}
