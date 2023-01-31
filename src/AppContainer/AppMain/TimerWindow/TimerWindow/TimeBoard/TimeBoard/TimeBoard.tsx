import React from 'react';
import styles from './timeboard.module.css';
import { timerProps } from '../../../../../globalTypes';

export function TimeBoard(props: {timerProps: timerProps, dateObj: Date}) {
  return (
    <div className={styles.timer}
    style={(props.timerProps.isActive || props.timerProps.isPaused) && !props.timerProps.isBrake ? {color: 'var(--red-main)'} : props.timerProps.isBrake ? {color: 'var(--green)'} : {}}>
      {`${props.dateObj.getMinutes() < 10 ?
      '0' + props.dateObj.getMinutes() :
      props.dateObj.getMinutes()}:${props.dateObj.getSeconds() < 10 ?
        '0' + props.dateObj.getSeconds() : props.dateObj.getSeconds()}`}
      <svg onClick={() => props.timerProps.setTime(time => time + 60000)} className={styles.plus} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
        <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
      </svg>
    </div>
  );
}
