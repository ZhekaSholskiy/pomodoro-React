import { tasksIvents } from "../../../../../globalTypes";
import { compareCoords } from "./compareCoords";

export function manageHighlighting(props: tasksIvents) {
  if (props.taskRef.current !== null) {
    const comparisingCoords = props.taskRef.current.getBoundingClientRect();

  const topBorderObserver = compareCoords(comparisingCoords, props.movingObj, 0);
  const bottomBorderObserver = compareCoords(comparisingCoords, props.movingObj, 1);

  const objClasses = props.taskRef.current.classList;
  const taskId = props.taskRef.current.id;
  const currentElNumber = props.tasks.findIndex(el => el.id === taskId);
  const lastElHighlighted = (index: number) => {return taskId === props.tasks[props.tasks.length - index].id};
  const setHighLightedIndex = (index: number = 0) => {props.setHighlighted(currentElNumber + index)};
  if (topBorderObserver && !props.isAbsolute) {
    objClasses.add(props.styles.highlight);
    objClasses.remove(props.styles.highlightBot);
    currentElNumber < props.choosedEl ? setHighLightedIndex() : setHighLightedIndex(-1);
  } else if (bottomBorderObserver && !props.isAbsolute &&
    (lastElHighlighted(1) || (lastElHighlighted(2) && props.choosedEl === (props.tasks.length - 1)))) {
    objClasses.add(props.styles.highlightBot);
    objClasses.remove(props.styles.highlight);
    props.choosedEl === (props.tasks.length - 1) ?
    setHighLightedIndex(1):
    setHighLightedIndex();
  } else {
    objClasses.remove(props.styles.highlight);
    objClasses.remove(props.styles.highlightBot);
  }
  }
}

