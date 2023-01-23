import { IStatistic } from "../AppMain/TasksWindow/model";

export function recalcTime(inputDate: Date, necessaryWeek: string) {
  const day = inputDate.getDate();
  let recalcTime = new Date().setHours(0,0,0,0);
  if (necessaryWeek === 'Прошедшая неделя') {
    return new Date(recalcTime).setDate(day - 7);
  } else if (necessaryWeek === 'Две недели назад') {
    return new Date(recalcTime).setDate(day - 14);
  } else {
    return inputDate.getTime()
  }
}

export function getCurrentWeek(week: string, generalInfo: IStatistic) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const dayOfMonth = now.getDate();
  const dayOfWeek = now.getDay();
  const dayOfWeekBeginning = dayOfWeek === 0 ? dayOfMonth - 6 : dayOfMonth - dayOfWeek + 1;
  const thisWeekEntryPoint = new Date(year, month, dayOfWeekBeginning);
  const recalcEntryPoint = recalcTime(thisWeekEntryPoint, week)
  const filtredInfo:IStatistic = {
    totalTime: filterInfo(generalInfo, 'totalTime', recalcEntryPoint) as Date[],
    totalTomatos: filterInfo(generalInfo, 'totalTomatos', recalcEntryPoint) as object & {time: number, date: Date}[],
    pauseTime: filterInfo(generalInfo, 'pauseTime', recalcEntryPoint) as Date[],
    stopAmount: filterInfo(generalInfo, 'stopAmount', recalcEntryPoint) as Date[],
  };
  return filtredInfo;
}

export function filterInfo(generalInfo: IStatistic, property: string, timePoint:number, totalTomatos?:boolean) {
  let filtredArray;
  const weekPlus = new Date(timePoint);
  const timePointPlus = weekPlus.setDate(weekPlus.getDate() + 7);
    filtredArray = generalInfo[property].filter(el => {
      if (el instanceof Date) {
        return el.getTime() >= timePoint && el.getTime() <= timePointPlus;
      } else {
         return el.date.getTime() >= timePoint && el.date.getTime() <= timePointPlus;
      }
    })
  return filtredArray;
}
