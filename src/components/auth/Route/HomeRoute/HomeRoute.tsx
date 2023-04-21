import { Navigate, useLocation } from 'react-router-dom';

import { useFirebase } from '../../../../firebase';
import Loader from '../../../StyleLoader';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetchingUser } = useFirebase();
  const location = useLocation();

  return isFetchingUser ? (
    <Loader />
  ) : !!user ? (
    <>{children}</>
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
};

export default AuthRoute;
