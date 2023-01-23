import React, { RefObject, useEffect, useRef, useState } from 'react';
import styles from './menu.module.css';
import { Dropdown } from './Dropdown';
import ReactDOM from 'react-dom';
import { ITask, useStoreState } from '../../../model';

export function Menu(props: {el: ITask, counterRef: RefObject<HTMLDivElement>, enableInput: () => void}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modalWindow = document.getElementById('modal');
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<DOMRect>()

  function updatePosition() {
    setPosition(ref.current?.getBoundingClientRect());
  }

  useEffect(() => {
    setPosition(ref.current?.getBoundingClientRect());
  }, [])
  useEffect(() => {

    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition)
      document.removeEventListener('scroll', updatePosition);
    }
  })

  return (
  <>
  <div className={styles.menuWrapper} onClick={(event) => {
      if (ref.current?.contains(event.target as Node)) {
        setIsDropdownOpen(!isDropdownOpen);
      }
    }} ref={ref}>
      <svg className={`${styles.menuBg} unclicked`} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className='unclicked' cx="25" cy="25" r="25" fill="#C4C4C4"/>
      </svg>
      <svg className={`${styles.menuPoints} unclicked`} width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className='unclicked' cx="3" cy="3" r="3" fill="#C4C4C4"/>
        <circle className='unclicked' cx="13" cy="3" r="3" fill="#C4C4C4"/>
        <circle className='unclicked' cx="23" cy="3" r="3" fill="#C4C4C4"/>
      </svg>
    </div>
    {modalWindow !== null && position && isDropdownOpen && ReactDOM.createPortal(
      <Dropdown
        x={position.x - 69.5}
        y={position.y + 10}
        el={props.el}
        outsideClick={() => setIsDropdownOpen(false)}
        menuRef={ref}
        counterRef={props.counterRef}
        enableInput={() => props.enableInput()}
      />
      , modalWindow
    )}
  </>
  );
}
