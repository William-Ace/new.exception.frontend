import { Navigate, useLocation } from 'react-router-dom';

import { useFirebase } from '../../../../firebase';
import Loader from '../../../StyleLoader';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetchingUser } = useFirebase();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  return isFetchingUser ? (
    <Loader />
  ) : !!user ? (
    <Navigate to={from} state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default AuthRoute;
