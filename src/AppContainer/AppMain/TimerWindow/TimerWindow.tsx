import React, { useEffect, useState } from 'react';
import styles from './timerwindow.module.css';
import { Button } from '../../../UIElements/Button';
import { useStoreActions, useStoreState } from '../TasksWindow/model';

export function TimerWindow(props: {updateSignal: boolean}) {
  const tasks = useStoreState((state) => state.tasks);
  const removeTask = useStoreActions((actions) => actions.removeTask)
  const currentTask = tasks[0];
  const [time, setTime] = useState(1500000);
  const [dateObj, setDateObj] = useState(new Date(time));
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBrake, setIsBrake] = useState(false);
  const [tomato, setTomato] = useState(1);
  const [taskNumber, setTaskNumber] = useState(1);
  const postData = useStoreActions((actions) => actions.postInfo);
  const statInfo = useStoreState((state) => state.statInfo);
  const [totalTime, setTotalTime] = useState<Date[]>(statInfo.totalTime);
  const [totalTomatos, setTotalTomatos] = useState<{time: number, date: Date}[]>(statInfo.totalTomatos);
  const [wholeTomato, setWholeTomato] = useState(0);
  const [pauseTime, setPauseTime] = useState<Date[]>(statInfo.pauseTime);
  const [stopAmount, setStopAmount] = useState<Date[]>(statInfo.stopAmount);



  function toggleTimer() {
    if (isActive) {
      setIsActive(!isActive);
      setIsPaused(true);
    } else {
      setIsActive(true);
      setIsPaused(false);
    }
  }

  function stopAll() {
    setIsActive(false);
    setIsPaused(false);
    setIsBrake(false);
    setTime(1500000);
  }

  function stopTimer() {
    if (isBrake) {
      stopAll();
      setTomato(tomato => tomato + 1);
    } else if (isPaused) {
      removeTask(currentTask);
      currentTask && setTaskNumber(taskNumber => taskNumber + 1);
      stopAll();
      setWholeTomato(0);
    } else {
      setStopAmount(stopAmount => [...stopAmount, new Date()])
      stopAll();
      setWholeTomato(0);
    }
  }

  useEffect(() => {
    setTomato(1);
    stopAll();
  }, [currentTask]);

  useEffect(() => {
    let pauseTimer:any = null;

    if (isPaused) {
      pauseTimer = setInterval(() => {
        setPauseTime(pauseTime => [...pauseTime, new Date()]);
      }, 1000)
    } else {
      clearInterval(pauseTimer);
    }

    return () => clearInterval(pauseTimer);

  }, [isPaused])

  useEffect(() => {
    setDateObj(new Date(time));

    let timer:any = null;

    if (isActive) {
      timer = setInterval(() => {
        setTime(time => time - 1000);
        setTotalTime(totalTime => [...totalTime, new Date()]);
        setWholeTomato(wholeTomato => wholeTomato + 1000);
      }, 1000)
    } else if (!isActive && timer !== null) {
      clearInterval(timer);
    }

    if (time === 0) {
      setTimeout(() => {
        if (!isBrake) {
          setIsBrake(true);
          setTotalTomatos(totalTomatos => [...totalTomatos, {time: wholeTomato, date: new Date()}]);
          setWholeTomato(0)
          setTime(tomato % 4 === 0 ? 900000 : 300000);
        } else {
          setIsBrake(false)
          setTomato(tomato => tomato + 1)
          setTime(1500000);
        }
      }, 1000)
    }

      postData({
        totalTime: totalTime,
        totalTomatos: totalTomatos,
        pauseTime: pauseTime,
        stopAmount: stopAmount
      })

    return () => clearInterval(timer)
  }, [time, isActive, isBrake, tomato, totalTime, wholeTomato, totalTomatos, pauseTime, postData, stopAmount])


  return (currentTask && <div className={styles.timerContainer}>
    {/* <input onKeyDown={(e) => {if (e.code === 'Enter') {
      setTime(Number(e.currentTarget.value))
    }}}></input> */}
    <div className={styles.timerHeader}
      style={(isActive || isPaused) && !isBrake ? {backgroundColor: 'var(--red-main)'} : isBrake ? {backgroundColor: 'var(--green)'} : {}}>
      <span className={styles.taskNameHeader}>{currentTask.task}</span>
      <span className={styles.currentTomato}>Помидор {tomato}</span>
    </div>
    <div className={styles.timerBody}>
      <div className={styles.timer}
      style={(isActive || isPaused) && !isBrake ? {color: 'var(--red-main)'} : isBrake ? {color: 'var(--green)'} : {}}>
        {`${dateObj.getMinutes() < 10 ?
         '0' + dateObj.getMinutes() :
         dateObj.getMinutes()}:${dateObj.getSeconds() < 10 ?
          '0' + dateObj.getSeconds() : dateObj.getSeconds()}`}
        <svg onClick={() => setTime(time => time + 60000)} className={styles.plus} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
          <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
        </svg>
      </div>
      <div className={styles.taskDescr}>
        <span className={styles.taskNumber}>Задача {taskNumber} - </span>
        <span className={styles.taskNameBody}>{currentTask.task}</span>
      </div>
      <div className={styles.taskControl}>
        <Button
          text={isActive ? 'Пауза' : isPaused ? 'Продолжить' : 'Старт'}
          className={styles.startBtn}
          onClick={() => toggleTimer()}/>
        <Button
          text={isPaused && !isBrake ? 'Сделано' : isBrake ? 'Пропустить' : 'Стоп'}
          className={!isActive && !isPaused && tomato === 1 ? styles.stopBtn : styles.stopBtnRed}
          onClick={() => stopTimer()}
          disabled={!isActive && !isPaused && tomato === 1}/>
      </div>
    </div>
  </div>)
}
