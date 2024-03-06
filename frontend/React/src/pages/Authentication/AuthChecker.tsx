
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
const AuthChecker: React.FC = ({ children }) => {
  const navigate = useNavigate();
  let { pathname } = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('usertoken');

    if (!token) {
      navigate('/Login', { state: { message: 'Session missing, please log in.' } });
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

        if (isTokenExpired) {
          navigate('/Login', { state: { message: 'Session expired, please log in again.' } });
        }
      } catch (error) {
        console.error('Error decoding token:', error.message);
        navigate('/Login', { state: { message: 'Session Expired, please log in again.' } });
      }
    }
    const role = localStorage.getItem('role');
    const pathWithoutQuery = pathname.split('?')[0];
    const onboardingPath = pathWithoutQuery.split('/')[1];
    // console.log('rolerolerole', role, 'onboardingPathonboardingPath', onboardingPath)
    if (
      (role === 'seller' && (onboardingPath === 'OnboardingBuyer' || onboardingPath === 'OnboardingAdmin')) ||
      (role === 'buyer' && (onboardingPath === 'OnboardingSeller' || onboardingPath === 'OnboardingAdmin')) ||
      (role === 'admin' && (onboardingPath === 'OnboardingSeller' || onboardingPath === 'OnboardingBuyer'))
    ) {
      navigate('/unauthorized');
    }


  });

  return <>{children}</>;
};
export default AuthChecker;
