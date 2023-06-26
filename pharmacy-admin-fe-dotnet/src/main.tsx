import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import customTheme from './theme';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications as NotificationsProvider } from '@mantine/notifications';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

import router from './pages/router';
import store from './redux/store';

import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import i18next from './locales/i18n';
import { AuthProvider } from './contexts/AuthContext';
import { DatesProvider } from '@mantine/dates';

dayjs.locale(i18next.language);
// https://day.js.org/docs/en/plugin/plugin
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(duration);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <MantineProvider theme={customTheme} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
              <DatesProvider settings={{ locale: 'vi', weekendDays: [0] }}>
                <NotificationsProvider />
                <RouterProvider router={router} />
              </DatesProvider>
            </ModalsProvider>
          </MantineProvider>
        </AuthProvider>
      </ReduxProvider>
    </I18nextProvider>
  </React.StrictMode>
);
