import { statisticType } from "../../model";

export function setStatisticTime(argument: statisticType[]) {
  if (argument.length === 0) {
    return [{time: 1, date: new Date()}];
  } else if (argument[argument.length - 1].date instanceof Date && argument[argument.length - 1].date.getDate() === (new Date()).getDate()) {
    const newArray = argument;
    newArray[argument.length - 1] = {time: argument[argument.length - 1].time + 1, date: new Date()}
    return [...newArray];
  } else {
    return [...argument, {time: 1, date: new Date()}]
  }
}
