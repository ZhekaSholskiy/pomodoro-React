import React from 'react';
import styles from './timerwindow.module.css';
import { TimeBoardWrapper } from './TimeBoard/TimeBoardWrapper';
import { ControlButtons } from './ControlButtons';
import { timerProps } from '../../../globalTypes';

export function TimerWindow(props: {timerProps: timerProps}) {


  return (props.timerProps.currentTask && <div className={styles.timerContainer}>
    <div className={styles.timerHeader}
      style={(props.timerProps.isActive || props.timerProps.isPaused) && !props.timerProps.isBrake ? {backgroundColor: 'var(--red-main)'} : props.timerProps.isBrake ? {backgroundColor: 'var(--green)'} : {}}>
      <span className={styles.taskNameHeader}>{props.timerProps.currentTask.task}</span>
      <span className={styles.currentTomato}>Помидор {props.timerProps.tomato}</span>
    </div>
    <div className={styles.timerBody}>
      <TimeBoardWrapper timerProps={props.timerProps}/>
      <div className={styles.taskDescr}>
        <span className={styles.taskNumber}>Задача {props.timerProps.taskNumber} - </span>
        <span className={styles.taskNameBody}>{props.timerProps.currentTask.task}</span>
      </div>
      <ControlButtons timerProps={props.timerProps}/>
    </div>
  </div>);
}
