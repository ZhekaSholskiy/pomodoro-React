import { Action, createTypedHooks } from 'easy-peasy';

export interface ITask {
  tomatos: number;
  task: string;
  id: string;
}

export interface storeModel {
  tasks: Array<ITask>;
}

export interface IStatistic {
  [key: string]: Array<Date | object & {time: number, date: Date}>;
  totalTime: Date[];
  totalTomatos: {time: number, date: Date}[];
  pauseTime: Date[];
  stopAmount: Date[];
}

export interface tasksModel {
  tasks: Array<ITask>;
  statInfo: IStatistic;
  postInfo: Action<tasksModel, IStatistic>;
  addTask: Action<tasksModel, ITask>;
  removeTask: Action<tasksModel, ITask>;
  increaseTomato: Action<tasksModel, ITask>;
  reduceTomato: Action<tasksModel, ITask>;
}

const typedHooks = createTypedHooks<tasksModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
