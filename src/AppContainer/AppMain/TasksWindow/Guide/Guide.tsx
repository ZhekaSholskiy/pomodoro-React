import React from 'react';
import styles from './guide.module.css';

export function Guide() {
  return (
        <ul className={styles.guideList}>
                <li className={styles.guideItemMarker}>
                  <span className={styles.guideItem}>
                    Выберите категорию и напишите название текущей задачи
                  </span>
                </li>
                <li className={styles.guideItemMarker}>
                  <span className={styles.guideItem}>
                    Запустите таймер («помидор»)
                  </span>
                </li>
                <li className={styles.guideItemMarker}>
                  <span className={styles.guideItem}>
                    Работайте пока «помидор» не прозвонит
                  </span>
                </li>
                <li className={styles.guideItemMarker}>
                  <span className={styles.guideItem}>
                    Сделайте короткий перерыв (3-5 минут)
                  </span>
                </li>
                <li className={styles.guideItemMarker}>
                  <span className={styles.guideItem}>
                    Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                  </span>
                </li>
              </ul>
  );
}
