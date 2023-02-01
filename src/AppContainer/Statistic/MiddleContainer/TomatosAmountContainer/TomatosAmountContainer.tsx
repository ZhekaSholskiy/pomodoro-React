import React from 'react';
import styles from './tomatosamountcontainer.module.css';
import { IStatistic } from '../../../model';
import { handlePomodoro } from './handlePomodoro';

export function TomatosAmountContainer(props: {statistic: IStatistic, pickedDay: number}) {
  return (
    <div className={styles.tomatosAmountContainer}>
      { props.statistic.totalTime.filter(el => el.date.getDay() === props.pickedDay).length === 0 ?
        <div className={styles.holePomodoro}></div> :
        <>
        <div className={styles.previewPart}>
          <div className={styles.tomato}></div>
          <div className={styles.tomatosAmount}>
            x{props.statistic.totalTomatos.filter(el => el.date.getDay() === props.pickedDay).length}
          </div>
        </div>
        <div className={styles.textPart}>
        {handlePomodoro(props.statistic.totalTomatos.filter(el => el.date.getDay() === props.pickedDay).length)}
        </div>
        </>
      }
    </div>
  );
}
