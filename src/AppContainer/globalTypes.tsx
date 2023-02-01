import { ITask } from "./model";

export type boolState = React.Dispatch<React.SetStateAction<boolean>>;

export type numState = React.Dispatch<React.SetStateAction<number>>;

export interface timerProps {
  currentTask: ITask,
  isActive: boolean,
  isPaused: boolean,
  isBrake: boolean,
  tomato: number,
  time: number,
  setTime: numState,
  taskNumber: number,
  setWholeTomato:numState,
  setIsActive: boolState,
  setIsPaused: boolState,
  stopAll: () => void,
  setTomato: numState,
  setTaskNumber: numState,
}
 export interface separateTask {
  el: ITask,
  movingObj: DOMRect,
  setMovingObj: (coords: DOMRect) => void,
  highlighted: number,
  setHighlighted: (elIndex: number) => void,
  choosedEl: number,
  setChoosedEl: (choosedEl: number) => void,
  id: string,
  swapStore: () => void
}

type coords = {
    top: number | undefined;
    left: number | undefined;
}

export interface tasksIvents extends separateTask {
  setIsAbsolute: boolState,
  setMouseCoord: React.Dispatch<React.SetStateAction<coords>>,
  taskRef: React.RefObject<HTMLDivElement>,
  styles: any,
  tasks: ITask[],
  isAbsolute: boolean,
  mouseCoord: coords
}
