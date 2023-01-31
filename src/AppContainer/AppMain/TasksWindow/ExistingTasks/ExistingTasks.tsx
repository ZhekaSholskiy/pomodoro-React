import React, { useEffect, useState } from 'react';
import styles from './existingtasks.module.css';
import { SeparateTask } from './SeparateTask';
import { useStoreState } from '../model';
import { tomatoTransform } from './tomatoTransform';

export function ExistingTasks(props: {setUpdateSignal: (toggle: boolean) => void}) {
  const [movingObj, setMovingObj] = useState({
    bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON: () => {}
  });
  const [highlighted, setHighlighted] = useState(0);
  const [choosedEl, setChoosedEl] = useState(0);
  const tasks = useStoreState((state) => state.tasks);
  const [needToUpdate, setNeedToUpdate] = useState(false);
  let totalTomatos = 0;

  useEffect(() => {
    function swapStore() {
      tasks.splice(highlighted, 0, tasks.splice(choosedEl, 1)[0])
      setNeedToUpdate(false);
      setHighlighted(0);
      setChoosedEl(0);
    }

    if (needToUpdate) {
      swapStore();
      props.setUpdateSignal(true);
    } else {
      props.setUpdateSignal(false);
    }
  }, [needToUpdate, highlighted, choosedEl])


  return (
    <div className={styles.container}>
      {
      tasks.map(el => {
        totalTomatos += el.tomatos;
        return <SeparateTask el={el}
                             key={`${el.id}component`}
                             id={el.id}
                             movingObj={movingObj}
                             setMovingObj={setMovingObj}
                             highlighted={highlighted}
                             setHighlighted={setHighlighted}
                             choosedEl={choosedEl}
                             setChoosedEl={setChoosedEl}
                             swapStore={() => setNeedToUpdate(true)}
                             />
      })
      }
      {totalTomatos !== 0 && <div className={styles.totalTomatos}>{tomatoTransform(totalTomatos)}</div>}
    </div>
  );
}
