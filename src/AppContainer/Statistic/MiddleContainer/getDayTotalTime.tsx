import { IStatistic } from "../../AppMain/TasksWindow/model";

export function getDayTotalTime(day: number, statistic: IStatistic) {
  return statistic.totalTime.filter(el => el.getDay() === day).length/60;
}
