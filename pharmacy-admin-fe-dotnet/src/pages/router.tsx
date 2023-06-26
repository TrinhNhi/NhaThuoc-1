import AuthLayout from '@/layouts/AuthLayout';
import BaseLayout from '@/layouts/BaseLayout';

import { ROUTER } from '@/configs/router';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Dashboard from './Dashboard';
import Page404 from './Error/404';
import Login from './Login';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import Drugs from './Drugs';
import Suppliers from './Suppliers';
import SignUp from './SignUp';
import Properties from './Properties';
import { Order } from './Orders';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN} element={<Login />} />
        <Route path={ROUTER.SIGNUP} element={<SignUp />} />
      </Route>
      <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
        <Route path={ROUTER.BASE} element={<Navigate to={ROUTER.DASHBOARD} />} />
        <Route path={ROUTER.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTER.DRUGS} element={<Drugs />} />
        <Route path={ROUTER.PROPERTY} element={<Properties />} />
        <Route path={ROUTER.SUPPLIERS} element={<Suppliers />} />
        <Route path={ROUTER.ORDERS} element={<Order />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
