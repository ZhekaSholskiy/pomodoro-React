import React, { useState } from 'react';
import styles from './middlecontainer.module.css';
import { IStatistic } from '../../model';
import { Chart } from './Chart';
import { WorkingTimeContainer } from './WorkingTimeContainer';
import { TomatosAmountContainer } from './TomatosAmountContainer';

export function MiddleContainer(props: {statistic: IStatistic, pickedDay:number, setPickedDay: (day:number) => void}) {

  return (
    <div className={styles.middleContainer}>
      <div className={styles.leftPart}>
        <WorkingTimeContainer statistic={props.statistic} pickedDay={props.pickedDay}/>
        <TomatosAmountContainer statistic={props.statistic} pickedDay={props.pickedDay}/>
      </div>
      <Chart statistic={props.statistic} onPicked={props.setPickedDay} pickedDay={props.pickedDay}/>
    </div>
  );
}
