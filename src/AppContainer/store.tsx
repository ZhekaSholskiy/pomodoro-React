import { action, createStore } from "easy-peasy";
import { ILocalStorage, IStatistic, tasksModel } from "./model";

let localStore: ILocalStorage = JSON.parse(window.localStorage.getItem('pomodoroApp-12l]hi2cewd21xs') as string)
const newStore: IStatistic = {
      totalTime: [],
      totalTomatos: [],
      pauseTime: [],
      stopAmount: [],
}
for (let key in localStore) {
    newStore[key] = localStore[key].map(el => {
        if (typeof el === 'string') {
          return new Date(el);
        } else if (el instanceof Date) {
          return el
        } else if (typeof el === 'object' && typeof el.date === 'string' ) {
          return {time: el.time, date: new Date(el.date)}
        } else {
          return el
        }
      });
}
console.log('localStore', localStore);
console.log('newStore', newStore)

export const tasksStore = createStore<tasksModel>({
  tasks: [],
  statInfo: newStore,

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
