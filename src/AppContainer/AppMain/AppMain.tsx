import React, { useState } from 'react';
import styles from './appmain.module.css';
import { TasksWindow } from './TasksWindow';
import { TimerWindowWrapper } from './TimerWindow';
import { action, createStore } from 'easy-peasy';
import { tasksModel } from './TasksWindow/model';

export const tasksStore = createStore<tasksModel>({
  tasks: [],
  statInfo: {
    totalTime: [],
    totalTomatos: [],
    pauseTime: [],
    stopAmount: [],
  },

  updateTasks: action((state, payload) => {
    state.tasks = payload
  }),

  postInfo: action((state, payload) => {
    state.statInfo = {
      totalTime: payload.totalTime,
      totalTomatos: payload.totalTomatos,
      pauseTime: payload.pauseTime,
      stopAmount: payload.stopAmount,
    }
  }),
  postTotalTime: action((state, payload) => {
    state.statInfo.totalTime = payload;
  }),
  postTotalTomatos: action((state, payload) => {
    state.statInfo.totalTomatos = payload;
  }),
  postPauseTime: action((state, payload) => {
    state.statInfo.pauseTime = payload;
  }),
  postStopAmount: action((state, payload) => {
    state.statInfo.stopAmount = payload;
  }),
  addTask: action((state, payload) => {
    state.tasks.push(payload);
  }),
  removeTask: action((state, payload) => {
    state.tasks.splice(state.tasks.findIndex(el => {
      return el.id === payload.id
    }), 1);
  }
  ),
  increaseTomato: action((state, payload) => {
    try {
    state.tasks[state.tasks.findIndex(el => {
        if (payload.tomatos === 20) return false;
        return el.id === payload.id
      })].tomatos++
      } catch (err) {
        return;
      }
  }),
  reduceTomato: action((state, payload) => {
    try {
      state.tasks[state.tasks.findIndex(el => {
        if (payload.tomatos === 1) return false;
        return el.id === payload.id
      })].tomatos--
    } catch (err) {
      return;
    }
  })
})
export function AppMain() {
  const [updateSignal, setUpdateSignal] = useState(false);


  // updateSignal нужен просто для того, чтобы при изменении TaskWindow обновилась информация в TimerWindowWrapper
  return (
    // <StoreProvider store={tasksStore}>
      <div className={styles.container}>
        <TasksWindow setUpdateSignal={setUpdateSignal}/>
        <TimerWindowWrapper updateSignal={updateSignal}/>
      </div>
    // </StoreProvider>
  );
}
