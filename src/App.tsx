import * as React from 'react';
import { AppContainer } from './AppContainer';
import './main.global.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppMain } from './AppContainer/AppMain';
import { Statistic } from './AppContainer/Statistic';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer/>,
    children: [
      {
        path: "/",
        element: <AppMain />,
      },
      {
        path: "/statistic",
        element: <Statistic />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
