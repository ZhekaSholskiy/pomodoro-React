import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './separatetask.module.css';
import { Menu } from './Menu';
import { ITask, useStoreState } from '../../model';
import { compareCoords } from './compareCoords';

export function SeparateTask(props: {
  el: ITask,
  movingObj: DOMRect,
  setMovingObj: (coords: DOMRect) => void,
  highlighted: number,
  setHighlighted: (elIndex: number) => void,
  choosedEl: number,
  setChoosedEl: (choosedEl: number) => void,
  id: string,
  swapStore: () => void
}) {
  const ref = useRef<HTMLDivElement>(null);
  const taskRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [disabledInput, setDisabledInput] = useState(true);
  const [inputValue, setInputValue] = useState(props.el.task);
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [mouseCoord, setMouseCoord] = useState(
      {top: taskRef.current?.getBoundingClientRect().y,
       left: taskRef.current?.getBoundingClientRect().x}
    );
  const tasks = useStoreState((state) => state.tasks);

  function changeInput(event: ChangeEvent<HTMLInputElement>) {
      setInputValue(event.target.value as string)
  }

  function enableInput() {
    if (inputRef.current !== null) {
      setDisabledInput(false);
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabledInput])

  function disableInput() {
    setDisabledInput(true);
  }
  useEffect(() => {

    function onMouseDown(e: MouseEvent) {
      if (e.target instanceof Element &&
          !e.target.classList.contains('unclicked') &&
          taskRef.current !== null) {
          taskRef.current?.classList.add(styles.absoluteTask);
          setMouseCoord({left: e.clientX, top: e.clientY})
          setIsAbsolute(true);
          props.setMovingObj(taskRef.current.getBoundingClientRect());
          const taskId = taskRef.current.id;
          props.setChoosedEl(tasks.findIndex(el => el.id === taskId));
      }
    }

    function onMouseUp(e: MouseEvent) {
      if (e.target instanceof Element &&
        !e.target.classList.contains('unclicked') &&
        taskRef.current !== null) {
      taskRef.current?.classList.remove(styles.absoluteTask);
      setIsAbsolute(false);
      props.setMovingObj({
        bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON: () => {}
      });
      props.swapStore()
      }
    }

    taskRef.current?.addEventListener('mousedown', (e) => onMouseDown(e))
    taskRef.current?.addEventListener('mouseup', onMouseUp)

    return () => {
      taskRef.current?.removeEventListener('mousedown', (e) => onMouseDown(e))
      taskRef.current?.removeEventListener('mouseup', onMouseUp)
    }
  }, [tasks])

  useEffect(() => {
    inputRef.current?.addEventListener('focusout', disableInput);
    inputRef.current?.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        disableInput();
      }
    })
  }, [])

  useEffect(() => {
    function moving(e: MouseEvent) {
      if (taskRef.current !== null) {
        setMouseCoord({left: e.clientX, top: e.clientY});
        props.setMovingObj(taskRef.current.getBoundingClientRect());
      }
    }

    if (isAbsolute) {
      taskRef.current?.addEventListener('mousemove', moving);
    }

    if (taskRef.current) {
      const comparisingCoords = taskRef.current?.getBoundingClientRect();
      const movingObj =  props.movingObj;

      const topBorderObserver = compareCoords(comparisingCoords, movingObj, 0);
      const bottomBorderObserver = compareCoords(comparisingCoords, movingObj, 1);

      const objClasses = taskRef.current.classList;
      const taskId = taskRef.current.id;
      const currentElNumber = tasks.findIndex(el => el.id === taskId);
      const lastElHighlighted = (index: number) => {return taskId === tasks[tasks.length - index].id};
      const setHighLightedIndex = (index: number = 0) => {props.setHighlighted(currentElNumber + index)};
      if (topBorderObserver && !isAbsolute) {
        objClasses.add(styles.highlight);
        objClasses.remove(styles.highlightBot);
        currentElNumber < props.choosedEl ? setHighLightedIndex() : setHighLightedIndex(-1);
      } else if (bottomBorderObserver && !isAbsolute &&
        (lastElHighlighted(1) || (lastElHighlighted(2) && props.choosedEl === (tasks.length - 1)))) {
        objClasses.add(styles.highlightBot);
        objClasses.remove(styles.highlight);
        props.choosedEl === (tasks.length - 1) ?
        setHighLightedIndex(1):
        setHighLightedIndex();
      } else {
        objClasses.remove(styles.highlight);
        objClasses.remove(styles.highlightBot);
      }
    }


    return () => taskRef.current?.removeEventListener('mousemove', moving);
  }, [isAbsolute, mouseCoord, props, tasks])

  return (
    <div className={styles.taskWrapper} ref={taskRef} id={props.id}
    style={isAbsolute ? {left: `${mouseCoord.left}px`,
                         top: `${mouseCoord.top}px`} : {}}>
      <div className={styles.tomatoCounter} ref={ref}>{props.el.tomatos}</div>
        <input className={styles.taskText} value={inputValue} disabled={disabledInput} ref={inputRef} onChange={(e) => changeInput(e)}>
        </input>
        {ref &&
        <Menu el={props.el} counterRef={ref} enableInput={() => enableInput()} />}
    </div>
  );
}
