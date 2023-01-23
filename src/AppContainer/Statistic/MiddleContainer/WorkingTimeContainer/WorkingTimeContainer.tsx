import React from 'react';
import styles from './workingtimecontainer.module.css';
import { getToday } from '../../../../utils/js/detToday';
import { handleTime } from '../../../../utils/js/dateTransform';
import { getDayTotalTime } from '../getDayTotalTime';
import { IStatistic } from '../../../AppMain/TasksWindow/model';

export function WorkingTimeContainer(props: {statistic: IStatistic, pickedDay: number}) {

  return (
    <div className={styles.workingTimeContainer}>
    <div className={styles.day}>{getToday(props.pickedDay)}</div>
    <div className={styles.workingTime}>
      {props.statistic.totalTime.filter(el => el.getDay() === props.pickedDay).length === 0 ?
        "нет данных" :
        <>
        Вы работали над задачами в течение
        <span className={styles.minutes}>
          &nbsp;{getDayTotalTime(props.pickedDay, props.statistic)/60 >= 1 &&
          handleTime(getDayTotalTime(props.pickedDay, props.statistic) * 60000, 'no-default', 'hour')}
          &nbsp;{handleTime(getDayTotalTime(props.pickedDay, props.statistic) * 60000, 'no-default', 'minute')}
        </span>
        </>
      }

    </div>
  </div>
  );
}
