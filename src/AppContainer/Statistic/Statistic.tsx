import React, { useState } from 'react';
import styles from './statistic.module.css';
import { TopContainer } from './TopContainer';
import { MiddleContainer } from './MiddleContainer';
import { BottomContainer } from './BottomContainer';
import { useStoreState } from '../model';
import { getCurrentWeek } from './recalcTime';

export function Statistic() {
  const [currentWeek, setCurrentWeek] = useState('Эта неделя');
  const [pickedDay, setPickedDay] = useState(currentWeek === 'Эта неделя' ? new Date().getDay() : 1);
  const generalInfo = useStoreState((state) => state.statInfo);

  return (
    <div className={styles.container}>
      <TopContainer setWeek={setCurrentWeek}/>
      <MiddleContainer statistic={getCurrentWeek(currentWeek, generalInfo)} pickedDay={pickedDay} setPickedDay={setPickedDay}/>
      <BottomContainer statistic={getCurrentWeek(currentWeek, generalInfo)} pickedDay={pickedDay}/>
    </div>
  );
}
