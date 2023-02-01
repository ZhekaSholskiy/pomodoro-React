import { Action, createTypedHooks } from 'easy-peasy';

export interface ITask {
  tomatos: number;
  task: string;
  id: string;
}

export interface storeModel {
  tasks: Array<ITask>;
}

export type statisticType = {time: number, date: Date};

export interface IStatistic {
  [key: string]: Array<Date | statisticType>;
  totalTime: statisticType[];
  totalTomatos: statisticType[];
  pauseTime: statisticType[];
  stopAmount: Date[];
}

export type localStorageType = {time: number, date: Date | string};

export interface ILocalStorage {
  [key: string]: Array<Date | statisticType | string>;
  totalTime: statisticType[];
  totalTomatos: statisticType[];
  pauseTime: statisticType[];
  stopAmount: Date[];
}

export interface tasksModel {
  tasks: Array<ITask>;
  statInfo: IStatistic;
  postInfo: Action<tasksModel, IStatistic>;
  postTotalTime: Action<tasksModel, statisticType[]>;
  postTotalTomatos: Action<tasksModel, statisticType[]>;
  postPauseTime: Action<tasksModel, statisticType[]>;
  postStopAmount: Action<tasksModel, Date[]>;
  addTask: Action<tasksModel, ITask>;
  updateTasks: Action<tasksModel, ITask[]>;
  removeTask: Action<tasksModel, ITask>;
  increaseTomato: Action<tasksModel, ITask>;
  reduceTomato: Action<tasksModel, ITask>;
}

const typedHooks = createTypedHooks<tasksModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
