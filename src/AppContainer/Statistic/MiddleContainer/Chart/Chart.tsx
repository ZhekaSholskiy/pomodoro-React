import React from 'react';
import styles from './chart.module.css';
import { getDayTotalTime } from '../getDayTotalTime';
import { generateRandomString } from '../../../../utils/React/generateRandomIndex';
import { tomatoTransform } from '../../../AppMain/TasksWindow/ExistingTasks/tomatoTransform';
import { IStatistic } from '../../../model';

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function Chart(props: {statistic: IStatistic, onPicked: (day:number) => void, pickedDay: number}) {

  const week = [];
  for (let i = 0; i <= 6; i++) {
    week.push({weekDay: weekDays[i], workingTime: getDayTotalTime(i === 6 ? 0 : i + 1, props.statistic)/60, dayNumber: i === 6 ? 0 : i + 1})
  }

  const maxWorkingTime = Math.max.apply(null, week.map(el => el.workingTime));
  function createLines() {
    const linesAmount = Math.floor(maxWorkingTime / 25);
    const wholeSegment = linesAmount * 25;
    let nodeList = [];

    for (let i = 0; i < linesAmount; i++) {
      nodeList.push(<div id={generateRandomString()} className={styles.chartLine}
        style={{height: `calc((100% * ${wholeSegment / maxWorkingTime}) / ${linesAmount})`}}>
        <span className={styles.timeline} >{tomatoTransform(i + 1, true)}</span>
    </div>)
    }

    return nodeList
  }

  return (
    <div className={styles.chart}>
      <div className={styles.chartPlot}>
          {week.map(el =>
            <div onClick={() => props.onPicked(el.dayNumber)} id={generateRandomString()} className={styles.column}
              style={el.workingTime === 0 ?
                {height: '5px', backgroundColor: 'var(--background-gray-darker)'} :
                el.dayNumber === props.pickedDay ?
                {height: `calc((${el.workingTime/maxWorkingTime})*100%)`, backgroundColor: 'var(--red-main)'}:
                {height: `calc((${el.workingTime/maxWorkingTime})*100%)`}}>
            </div>
          )}
          <div className={styles.linesContainer}>{createLines()}</div>
      </div>
      <div className={styles.chartAxis}>
        {week.map(el =>
            <div className={styles.weekDay} id={generateRandomString()}>{el.weekDay}</div>
          )}
      </div>
    </div>
  );
}
