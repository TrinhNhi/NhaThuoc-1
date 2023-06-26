import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import customTheme from './theme';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications as NotificationsProvider } from '@mantine/notifications';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './pages/router';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <MantineProvider theme={customTheme} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <NotificationsProvider />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </ReduxProvider>
  </React.StrictMode>
);
