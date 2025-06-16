import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col justify-center items-center py-12 px-6 lg:px-8">
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

      {location.pathname !== '/login' && (
        <div className="mt-8 text-center">
          <Link 
            to="/login" 
            className="font-medium text-teal-700 hover:text-teal-600"
          >
            Already have an account? Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
