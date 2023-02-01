import React, { useEffect, useState } from 'react';
import { statisticType, useStoreActions, useStoreState } from '../../model';
import { TimerWindow } from './TimerWindow';

const StandartTime:number = 1500000; // norma = 1500000

export function TimerWindowWrapper(props: {updateSignal: boolean}) {
  const currentTask = useStoreState((state) => state.tasks)[0];
  const [time, setTime] = useState(StandartTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBrake, setIsBrake] = useState(false);
  const [tomato, setTomato] = useState(1);
  const statInfo = useStoreState((state) => state.statInfo);
  const [totalTomatos, setTotalTomatos] = useState<statisticType[]>(statInfo.totalTomatos);
  const [wholeTomato, setWholeTomato] = useState(0);
  const [taskNumber, setTaskNumber] = useState(1);
  const postTotalTomatos = useStoreActions((actions) => actions.postTotalTomatos);

  function stopAll() {
    setIsActive(false);
    setIsPaused(false);
    setIsBrake(false);
    setTime(StandartTime);
  }

  useEffect(() => {
    setTomato(1);
    stopAll();
  }, [currentTask]);

  useEffect(() => {
    if (time === 0) {
      setTimeout(() => {
        if (!isBrake) {
          setIsBrake(true);
          setTotalTomatos(totalTomatos => [...totalTomatos, {time: wholeTomato, date: new Date()}]);
          setWholeTomato(0)
          setTime(tomato % 4 === 0 ? 900000 : 300000); // norma = 900000 : 300000
        } else {
          setIsBrake(false)
          setTomato(tomato => tomato + 1)
          setTime(StandartTime);
        }
      }, 0)
    }

      postTotalTomatos(totalTomatos)

  }, [time, isActive, isBrake, isPaused, tomato, wholeTomato, totalTomatos, postTotalTomatos])

  return <TimerWindow timerProps={{ currentTask: currentTask,
                                    isActive: isActive,
                                    isPaused: isPaused,
                                    isBrake: isBrake,
                                    tomato: tomato,
                                    time: time,
                                    setTime: setTime,
                                    taskNumber: taskNumber,
                                    setWholeTomato:setWholeTomato,
                                    setIsActive: setIsActive,
                                    setIsPaused: setIsPaused,
                                    stopAll: stopAll,
                                    setTomato: setTomato,
                                    setTaskNumber: setTaskNumber
                                  }}
  />
}
