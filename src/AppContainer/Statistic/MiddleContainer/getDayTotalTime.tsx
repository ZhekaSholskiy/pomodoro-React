import { IStatistic } from "../../model";

export enum metrics {
  totalTime = 'totalTime',
  pauseTime = 'pauseTime'
}

export function getDayTotalTime(day: number, statistic: IStatistic, metric: metrics = metrics.totalTime) {
  return statistic[metric].filter(el => el.date.getDay() === day).map(el => el.time)
    .reduce((prevObj, currentObj) =>
     prevObj + currentObj, 0
  );
}
