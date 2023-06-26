import Page404 from '@/pages/Error/404';
import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

interface LoaderLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (data: any) => React.ReactElement;
}

function LoaderLayout({ children }: LoaderLayoutProps) {
  const { promise } = useLoaderData() as { promise: Promise<unknown> };

  return <Await resolve={promise} errorElement={<Page404 />} children={children} />;
}

export default LoaderLayout;
