import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.css';
import { ITask, useStoreActions } from '../../../../../../model';
import { DeleteModal } from './DeleteModal';

export function Dropdown(props:
  {
    x: number,
    y: number,
    el: ITask,
    outsideClick: () => void,
    menuRef:React.RefObject<HTMLDivElement>,
    counterRef: React.RefObject<HTMLDivElement>,
    enableInput: () => void,
  }
  ) {
  const removeTask = useStoreActions((actions) => actions.removeTask);
  const increaseTomato = useStoreActions((actions) => actions.increaseTomato);
  const reduceTomato = useStoreActions((actions) => actions.reduceTomato);
  const ref = useRef<HTMLDivElement>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  function closeDropdown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node) && !props.menuRef.current?.contains(event.target as Node)) {
        props.outsideClick();
      }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdown)

    return () => document.removeEventListener('click', closeDropdown);
  })

  function increaseFunction() {
    increaseTomato(props.el);
    const counterObj = props.counterRef.current;
    if (counterObj !== null && Number(counterObj.textContent) < 20) {
      counterObj.style.backgroundColor = '#A8B64F';
      setTimeout(() => {
        counterObj.style.backgroundColor = 'transparent';
      }, 100)
    }
  }

  function reduceFunction() {
    reduceTomato(props.el);
    const counterObj = props.counterRef.current;
    if (counterObj !== null && Number(counterObj.textContent) !== 1) {
      counterObj.style.backgroundColor = '#DC3E22';
      setTimeout(() => {
        counterObj.style.backgroundColor = 'transparent';
      }, 100)
    }
  }



  return (
      <div className={styles.dropdownWrapper} style={{top: props.y, left: props.x}} ref={ref}>
        <ul className={styles.dropdownList}>
          <li className={`${styles.dropdownItem} ${styles.increaseItem}`} onClick={() => increaseFunction()}>
            Увеличить
          </li>
          <li className={`${styles.dropdownItem} ${styles.reduceItem}`} onClick={() => reduceFunction()}>
            Уменьшить
          </li>
          <li className={`${styles.dropdownItem} ${styles.editItem}`} onClick={() => {props.enableInput(); props.outsideClick()}}>
            Редактировать
          </li>
          <li className={`${styles.dropdownItem} ${styles.deleteItem}`}
              onClick={() => setDeleteModal(true)}
          >
            Удалить
          </li>
        </ul>
        {deleteModal && <DeleteModal closeModal={() => setDeleteModal(false)} deleteTask={() => removeTask(props.el)}/>}
    </div>
  );
}
