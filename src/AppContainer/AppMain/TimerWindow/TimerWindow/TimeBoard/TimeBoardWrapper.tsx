import React, { useEffect, useState } from 'react';
import { TimeBoard } from './TimeBoard';
import { setStatisticTime } from '../../setStatisticTime';
import { statisticType, useStoreActions, useStoreState } from '../../../../model';
import { timerProps } from '../../../../globalTypes';

export function TimeBoardWrapper(props: { timerProps:timerProps}) {
  const [dateObj, setDateObj] = useState(new Date(props.timerProps.time));
  const statInfo = useStoreState((state) => state.statInfo);
  const [totalTime, setTotalTime] = useState<statisticType[]>(statInfo.totalTime);
  const postTotalTime = useStoreActions((actions) => actions.postTotalTime);
  const [pauseTime, setPauseTime] = useState<statisticType[]>(statInfo.pauseTime);
  const postPauseTime = useStoreActions((actions) => actions.postPauseTime);

  useEffect(() => {
    setDateObj(new Date(props.timerProps.time));
  }, [props.timerProps.time])

  useEffect(() => {
    let timer:any = null;

    if (props.timerProps.isActive) {
      timer = setInterval(() => {
        props.timerProps.setTime(time => time - 1000);
        if (!props.timerProps.isBrake) {
          props.timerProps.setWholeTomato(wholeTomato => wholeTomato + 1000);
          const newArray = setStatisticTime(totalTime);
          setTotalTime(newArray);
        }
      }, 1000)
    } else if (!props.timerProps.isActive && timer !== null) {
      clearInterval(timer);
    }

    let pauseTimer:any = null;

    if (props.timerProps.isPaused) {
      pauseTimer = setInterval(() => {
        const newArray = setStatisticTime(pauseTime);
        setPauseTime(newArray);
      }, 1000)
    } else {
      clearInterval(pauseTimer);
    }

    postTotalTime(totalTime);
    postPauseTime(pauseTime);

    return () => {
                  clearInterval(pauseTimer)
                  clearInterval(timer)
                }
  }, [props.timerProps, totalTime, postTotalTime, pauseTime, postPauseTime])

  return <TimeBoard timerProps={props.timerProps} dateObj={dateObj}/>
}
