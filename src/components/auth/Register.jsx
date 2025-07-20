import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserPlusIcon, BeakerIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    setErrorMessage('');
    // Retrieve existing users from localStorage or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const userExists = users.some(user => user.email === data.email);
    if (userExists) {
      setErrorMessage('Email is already registered. Please login or use another email.');
      return;
    }

    // Add new user to users array
    users.push({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    setSuccessMessage('Registration successful! You can now login.');
  };

  const password = watch('password', '');

  return (
    <form className="space-y-6 bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-4">
        <BeakerIcon className="h-10 w-10 text-teal-500" aria-hidden="true" />
      </div>
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-teal-700 text-gray-900">
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`block w-full appearance-none rounded-md border px-3 py-2 placeholder-teal-400 focus:outline-none sm:text-sm bg-transparent text-gray-900 ${
              errors.name ? 'border-red-300' : 'border-teal-300'
            }`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-teal-700 text-gray-900">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`block w-full appearance-none rounded-md border px-3 py-2 placeholder-teal-400 focus:outline-none sm:text-sm bg-transparent text-gray-900 ${
              errors.email ? 'border-red-300' : 'border-teal-300'
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-teal-700">
          Password
        </label>
        <div className="mt-1">
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
              className={`block w-full appearance-none rounded-md border px-3 py-2 pr-10 placeholder-teal-400 focus:outline-none sm:text-sm bg-transparent text-gray-900 ${
                errors.password ? 'border-red-300' : 'border-teal-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 bg-transparent"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3.707 3.293a1 1 0 00-1.414 1.414l1.528 1.528A9.956 9.956 0 001 10c.73 2.89 4 7 9 7a9.96 9.96 0 004.76-1.22l2.528 2.528a1 1 0 001.414-1.414l-14-14zM10 13a3 3 0 01-3-3c0-.34.07-.66.19-.95l3.76 3.76c-.29.12-.6.19-.95.19z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-teal-700">
          Confirm Password
        </label>
        <div className="mt-1">
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className={`block w-full appearance-none rounded-md border px-3 py-2 pr-10 placeholder-teal-400 focus:outline-none sm:text-sm bg-transparent text-gray-900 ${
                errors.confirmPassword ? 'border-red-300' : 'border-teal-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 bg-transparent"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3.707 3.293a1 1 0 00-1.414 1.414l1.528 1.528A9.956 9.956 0 001 10c.73 2.89 4 7 9 7a9.96 9.96 0 004.76-1.22l2.528 2.528a1 1 0 001.414-1.414l-14-14zM10 13a3 3 0 01-3-3c0-.34.07-.66.19-.95l3.76 3.76c-.29.12-.6.19-.95.19z" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-teal-300 group-hover:text-teal-200" aria-hidden="true" />
          </span>
          Register
        </button>
      </div>
      <div className="text-sm text-center mt-4">
        <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
}
