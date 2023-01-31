import React, { useEffect, useRef, useState } from 'react';
import styles from './separatetask.module.css';
import { Menu } from './Menu';
import { useStoreState } from '../../model';
import { separateTask } from '../../../../globalTypes';
import { useMouseIvents } from './functions/useMouseIvents';
import { useHighligh } from './functions/useHighlight';

export function SeparateTask(props: separateTask) {
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabledInput])

  function disableInput() {
    setDisabledInput(true);
  }

  useEffect(() => {
    inputRef.current?.addEventListener('focusout', disableInput);
    inputRef.current?.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        disableInput();
      }
    })
  }, [])

  const propsObj = {
    ...props,
    setIsAbsolute: setIsAbsolute,
    setMouseCoord: setMouseCoord,
    taskRef: taskRef,
    styles: styles,
    tasks: tasks,
    isAbsolute: isAbsolute,
    mouseCoord: mouseCoord,
  }

  useMouseIvents(propsObj);
  useHighligh(propsObj);

  return (
    <div className={styles.taskWrapper} ref={taskRef} id={props.id}
    style={isAbsolute ? {left: `${mouseCoord.left}px`,
                         top: `${mouseCoord.top}px`} : {}}>
      <div className={styles.tomatoCounter} ref={ref}>{props.el.tomatos}</div>
        <input className={styles.taskText} value={inputValue} disabled={disabledInput} ref={inputRef} onChange={(e) =>
          setInputValue(e.target.value)}>
        </input>
        {ref &&
        <Menu el={props.el} counterRef={ref} enableInput={() => setDisabledInput(false)} />}
    </div>
  );
}
