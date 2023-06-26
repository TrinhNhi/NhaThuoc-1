import BaseLayout from '@/layouts/BaseLayout';

import { ROUTER } from '@/configs/router';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Dashboard from './Dashboard';
import Page404 from './Error/404';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path={ROUTER.BASE} element={<Navigate to={ROUTER.DASHBOARD} />} />
      <Route path={ROUTER.DASHBOARD} element={<Dashboard />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

export default router;
