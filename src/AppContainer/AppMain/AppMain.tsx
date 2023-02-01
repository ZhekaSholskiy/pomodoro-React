import React, { useEffect, useState } from 'react';
import styles from './appmain.module.css';
import { TasksWindow } from './TasksWindow';
import { TimerWindowWrapper } from './TimerWindow';
import { useStoreState } from '../model';

export function AppMain() {
  const [updateSignal, setUpdateSignal] = useState(false);
  const storageInfo = useStoreState((state) => state.statInfo)

  useEffect(() => {
    window.localStorage.setItem('pomodoroApp-12l]hi2cewd21xs', JSON.stringify(storageInfo)); //  JSON.stringify({}) - для обнуления
  }, [storageInfo])

  return (
      <div className={styles.container}>
        <TasksWindow setUpdateSignal={setUpdateSignal}/>
        <TimerWindowWrapper updateSignal={updateSignal}/>
      </div>
  );
}
