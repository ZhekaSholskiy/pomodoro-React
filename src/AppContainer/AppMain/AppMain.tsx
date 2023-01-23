import React, { useState } from 'react';
import styles from './appmain.module.css';
import { TasksWindow } from './TasksWindow';
import { TimerWindow } from './TimerWindow';
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
  postInfo: action((state, payload) => {
    state.statInfo = {
      totalTime: payload.totalTime,
      totalTomatos: payload.totalTomatos,
      pauseTime: payload.pauseTime,
      stopAmount: payload.stopAmount,
    }
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

  return (
    // <StoreProvider store={tasksStore}>
      <div className={styles.container}>
        <TasksWindow setUpdateSignal={setUpdateSignal}/>
        <TimerWindow updateSignal={updateSignal}/>
      </div>
    // </StoreProvider>
  );
}
