import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useEffect } from 'react';

export default function AuthLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      document.body.classList.add('bg-white');
    } else {
      document.body.classList.remove('bg-white');
    }
    return () => {
      document.body.classList.remove('bg-white');
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center py-12 px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Web Portal
        </h2>
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg px-10">
          <Outlet />
        </div>
      </div>

      {/* Removed the "Already have an account? Sign in" link as requested */}

      <Footer />
    </div>
  );
}
