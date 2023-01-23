import React, { useState } from 'react';
import styles from './topcontainer.module.css';

export function TopContainer(props: {setWeek: (text: string) => void}) {
  const [ddIsOpened, setDdIsOpened] = useState(false);
  const [ddContent, setDdContent] = useState('Эта неделя');

  function openDd(e: React.MouseEvent<HTMLDivElement>) {
    setDdIsOpened(!ddIsOpened);
    const ddArray = Array.from(e.currentTarget.children[1].children);
    if (!ddIsOpened) {
      ddArray.find(el => {
        return el.textContent === ddContent;
      })?.classList.add(styles.hideElem);
    } else {
      setTimeout(() => {
        ddArray.map(el => el.classList.remove(styles.hideElem))
      }, 200)
    }
  }

  function chooseDdContent(e: React.MouseEvent<HTMLLIElement>) {
    if (e.currentTarget.textContent !== null) {
      setDdContent(e.currentTarget.textContent);
      props.setWeek(e.currentTarget.textContent);
    };
  }

  return (
    <div className={`${styles.topContainer} ${ddIsOpened && styles.ddOpened}`}>
      <div className={styles.header}>Ваша активность</div>
      <div className={`${styles.dropdown}`} onClick={(e) => openDd(e)}>
        <div className={`${styles.ddShown} ${styles.ddItem}`}>{ddContent}
          <svg className={styles.ddRectangle} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1L8 8L1 1" stroke="#B7280F" stroke-width="2"/>
          </svg>
        </div>
        <ul className={styles.ddList}>
          <li className={styles.ddItem} onClick={(e) => {chooseDdContent(e)}}>Эта неделя</li>
          <li className={styles.ddItem} onClick={(e) => {chooseDdContent(e)}}>Прошедшая неделя</li>
          <li className={styles.ddItem} onClick={(e) => {chooseDdContent(e)}}>Две недели назад</li>
        </ul>

      </div>
    </div>
  );
}
