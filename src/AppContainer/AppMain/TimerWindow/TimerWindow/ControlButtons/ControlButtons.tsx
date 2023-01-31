import React, { useEffect, useState } from 'react';
import styles from './controlbuttons.module.css';
import { Button } from '../../../../../UIElements/Button';
import { useStoreActions, useStoreState } from '../../../TasksWindow/model';
import { timerProps } from '../../../../globalTypes';

export function ControlButtons(
  props: { timerProps: timerProps}
) {
  const removeTask = useStoreActions((actions) => actions.removeTask)
  const statInfo = useStoreState((state) => state.statInfo);
  const [stopAmount, setStopAmount] = useState<Date[]>(statInfo.stopAmount);
  const postStopAmount = useStoreActions((actions) => actions.postStopAmount);

  useEffect(() => {
    postStopAmount(stopAmount)
  }, [stopAmount, postStopAmount])

  function toggleTimer() {
    if (props.timerProps.isActive) {
      props.timerProps.setIsActive(!props.timerProps.isActive);
      props.timerProps.setIsPaused(true);
    } else {
      props.timerProps.setIsActive(true);
      props.timerProps.setIsPaused(false);
    }
  }

  function stopTimer() {
    if (props.timerProps.isBrake) {
      props.timerProps.stopAll();
      props.timerProps.setTomato(tomato => tomato + 1);
    } else if (props.timerProps.isPaused) {
      removeTask(props.timerProps.currentTask);
      props.timerProps.currentTask && props.timerProps.setTaskNumber(taskNumber => taskNumber + 1);
      props.timerProps.stopAll();
      props.timerProps.setWholeTomato(0);
    } else {
      setStopAmount(stopAmount => [...stopAmount, new Date()])
      props.timerProps.stopAll();
      props.timerProps.setWholeTomato(0);
    }
  }

  return (
    <div className={styles.taskControl}>
            <Button
              text={props.timerProps.isActive ? 'Пауза' : props.timerProps.isPaused ? 'Продолжить' : 'Старт'}
              className={styles.startBtn}
              onClick={() => toggleTimer()}/>
            <Button
              text={props.timerProps.isPaused && !props.timerProps.isBrake ? 'Сделано' : props.timerProps.isBrake ? 'Пропустить' : 'Стоп'}
              className={!props.timerProps.isActive && !props.timerProps.isPaused && props.timerProps.tomato === 1 ? styles.stopBtn : styles.stopBtnRed}
              onClick={() => stopTimer()}
              disabled={!props.timerProps.isActive && !props.timerProps.isPaused && props.timerProps.tomato === 1}/>
          </div>
  );
}
