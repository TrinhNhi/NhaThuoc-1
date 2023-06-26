import { ROUTER } from '@/configs/router';
import { Navigate, useOutlet } from 'react-router-dom';

const BaseLayout = () => {
  const outlet = useOutlet();
  let user = 'dfdf';

  if (!user) {
    return <Navigate to={ROUTER.DASHBOARD} replace />;
  }

  return <div className="app-container">{outlet}</div>;
};

export default BaseLayout;
