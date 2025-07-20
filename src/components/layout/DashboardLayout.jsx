import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Footer from './Footer';

export default function DashboardLayout({ isAuthenticated }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-teal-600">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 flex w-64 transform transition duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex w-64 flex-col bg-gray-800">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-gray-900">
            <h1 className="text-white text-xl font-bold">Web Portal</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            <a
              href="/"
              className="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-gray-900"
            >
              Dashboard
            </a>
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login';
              }}
              className="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow lg:hidden">
        <button
          type="button"
          className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          {sidebarOpen ? (
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:pl-64 min-h-screen">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
