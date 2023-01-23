import React from 'react';
import styles from './appcontainer.module.css';
import { AppFooter } from './AppFooter';
import { Outlet } from "react-router-dom";
import { StoreProvider } from 'easy-peasy';
import { tasksStore } from './AppMain';


export function AppContainer() {

  return (
    <StoreProvider store={tasksStore}>
      <div className={styles.container}>
        <AppFooter />
        <Outlet/>
        <div id='modal'></div>
      </div>
    </StoreProvider>
  );
}
