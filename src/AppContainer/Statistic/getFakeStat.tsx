import { IStatistic } from "../AppMain/TasksWindow/model";

export function getFakeStat() {
  let fakeTotalTime = [];
  let fakeTotalTomatos =  [];
  let fakePauseTime = [];
  let fakeStopAmount = [];

  for (let i = 1; i < 20; i++) {
    let random = Math.random() * 10000;
    for (let e = 0; e < random; e++) {
      fakeTotalTime.push(new Date(2023, 0, i, Math.random() * 24, Math.random() * 60, Math.random() * 60));
    };
    random = Math.random() * 6;
    for (let e = 0; e <= Math.random() * 6; e++) {
      fakeTotalTomatos.push({time: 25 * 60, date: new Date(2023, 0, i, Math.random() * 24, Math.random() * 60, Math.random() * 60)});
    };
    random = Math.random() * 1000;
    for (let e = 0; e < Math.random() * 1000; e++) {
      fakePauseTime.push(new Date(2023, 0, i, Math.random() * 24, Math.random() * 60, Math.random() * 60));
    };
    random = Math.random() * 10;
    for (let e = 0; e < Math.random() * 10; e++) {
      fakeStopAmount.push(new Date(2023, 0, i, Math.random() * 24, Math.random() * 60, Math.random() * 60));
    }
  }

  const fakeStat:IStatistic = {
    totalTime: fakeTotalTime,
    totalTomatos: fakeTotalTomatos,
    pauseTime: fakePauseTime,
    stopAmount: fakeStopAmount,
  }

  return fakeStat
}
