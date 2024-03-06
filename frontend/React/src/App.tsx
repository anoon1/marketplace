import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpMain from './pages/SignUpMain';
const UnAuth = lazy(() => import('./pages/defaultPage/unauthorized'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
import AuthChecker from './pages/Authentication/AuthChecker';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUpMain" element={<SignUpMain />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<UnAuth />} />
        <Route path="*" element={<UnAuth />} />  
        <Route index element={<Home />} />

        {/* Using AuthChecker as a wrapper around secured routes */}
        <Route
          path="/secured"
          element={
            <AuthChecker>
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <ECommerce />
                  </Suspense>
                }
              />
             
            </AuthChecker>
          }
        />

        {/* Using AuthChecker as a wrapper around DefaultLayout */}
        <Route
          element={
            <AuthChecker>
              <Suspense fallback={<Loader />}>
                <DefaultLayout />
              </Suspense>
            </AuthChecker>
          }
        >
          <Route element={<ECommerce />} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<Loader />}>
                  <route.component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
