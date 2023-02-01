import React from 'react';
import styles from './bottomcontainer.module.css';
import { IStatistic } from '../../model';
import { getDayTotalTime, metrics } from '../MiddleContainer/getDayTotalTime';

export function BottomContainer(props: {statistic: IStatistic, pickedDay: number}) {
  function handlePauseTime(time: number) {
    return time < 60 ?
      `${time}c` :
      time < 3600 ?
      `${Math.floor(time/60)}м` :
      `${Math.floor(time/3600)}ч`;
  }

  let clearTime = 0;
  props.statistic.totalTomatos.filter(el => el.date.getDay() === props.pickedDay).map(el => clearTime += el.time);
  let dirtyTime = getDayTotalTime(props.pickedDay, props.statistic);
  const percent:number = (clearTime / (dirtyTime * 1000)) * 100; // ms / s
  return (
    <div className={styles.bottomContainer}>
      <div className={`${styles.focus} ${styles.metric} ${props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 && styles.graySvg}`}
        style={
          props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 ? {backgroundColor: 'var(--background-gray-light)'} :
          {}
        }>
        <div className={styles.metricContainer}>
          <h2 className={styles.metricTitle}>
          Фокус
        </h2>
        <div className={styles.metricResult}>
          {percent ? Math.floor(percent) + "%" : '0%'}
        </div>
        </div>
        <div className={styles.preview}>
          <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#FFAE35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z" stroke="#FFAE35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z" stroke="#FFAE35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div className={`${styles.pauseTime} ${styles.metric} ${props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 && styles.graySvg}`}
        style={
          props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 ? {backgroundColor: 'var(--background-gray-light)'} :
          {}
        }>
        <div className={styles.metricContainer}>
          <h2 className={styles.metricTitle}>
          Время на паузе
        </h2>
        <div className={styles.metricResult}>
            {handlePauseTime(getDayTotalTime(props.pickedDay, props.statistic, metrics.pauseTime))}
        </div>
        </div>
        <div className={styles.preview}>
          <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#9C97D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M64.3154 37.1579V64.3158L77.8944 77.8947" stroke="#9C97D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div className={`${styles.breakPoints} ${styles.metric} ${props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 && styles.graySvg}`}
        style={
          props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 ? {backgroundColor: 'var(--background-gray-light)'} :
          {}
        }>
        <div className={styles.metricContainer}>
          <h2 className={styles.metricTitle}>
          Остановки
        </h2>
        <div className={styles.metricResult}>{props.statistic.stopAmount.filter(el => el.getDay() === props.pickedDay).length}</div>
        </div>
        <div className={styles.preview}>
          <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#7FC2D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28 27L102 101" stroke="#7FC2D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
