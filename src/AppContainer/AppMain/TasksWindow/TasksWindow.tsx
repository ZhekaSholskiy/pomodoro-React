import React, { useRef } from 'react';
import styles from './taskswindow.module.css';
import { Button } from '../../../UIElements/Button';
import { ExistingTasks } from './ExistingTasks';
import { generateRandomString } from '../../../utils/React/generateRandomIndex';
import { Guide } from './Guide';
import { useStoreActions } from '../../model';


export function TasksWindow(props: {setUpdateSignal: (toggle: boolean) => void}) {

  const addTask = useStoreActions((actions) => actions.addTask);
  const ref = useRef<HTMLInputElement>(null);

  function addTaskToStore() {
    if (ref.current !== null) {
      addTask({
        tomatos: 1,
        task: ref.current?.value,
        id: generateRandomString(),
    })
    ref.current.value = '';
    ref.current.blur();
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
      Ура! Теперь можно начать работать:
      </h2>
      <Guide />
      <input type="text" className={styles.taskNameInput} placeholder='Название задачи' ref={ref} onKeyDown={(event) => {
        if (event.code === 'Enter') {
          addTaskToStore();
        }
      }}/>
      <Button text='Добавить' className={styles.button}
        onClick={() => addTaskToStore()}
      />
      <ExistingTasks setUpdateSignal={props.setUpdateSignal}/>
    </div>
  );
}
