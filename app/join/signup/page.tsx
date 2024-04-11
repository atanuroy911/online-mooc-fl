'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from '@/app/hooks/customRouter';
import { toast } from 'react-toastify';

const SignUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const router = useRouter();

  // Generate username based on current input values
  const generateUsername = () => {
    // Extract the first word from the first name
    const firstWord = firstName.trim().split(' ')[0];
  
    // Generate username using the first word of the first name, first letter of the last name, and last 4 digits of the roll number
    return `${firstWord.toLowerCase()}${lastName.toLowerCase().charAt(0)}${rollNumber.slice(-4)}`;
  };
  

  // Display generated username in real-time
  const generatedUsername = generateUsername();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Check if email already exists
      const checkResponse = await axios.get('/api/check', {
        params: {
          email,
        }
      });

      if (checkResponse.data.exists) {
        toast.error('Email already exists');
        return;
      }

      // If no duplicate found, proceed with signup
      const response = await axios.post('/api/signup', { firstName, lastName, email, password, rollNumber, username: generateUsername() });

      if (response.status === 200 || response.status === 201) {
        // Signup successful
        toast.success('User signed up successfully');
        // Redirect to login page
        router.push('/join/login');
      } else {
        // Handle signup error
        console.error('Error signing up');
        toast.error('Error signing up');
      }
    } catch (error) {
      console.error('Error signing up', error);
      toast.error('Error signing up');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Education Live" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <div className="mt-1">
                <input id="rollNumber" name="rollNumber" type="number" autoComplete="off" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            {/* Show generated username */}
            {generatedUsername && (
              <div className="mt-4 text-center text-gray-700">
                Your username will be: <strong>{generatedUsername}</strong>
              </div>
            )}

        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign up
          </button>
        </div>
      </form>
    </div>
      </div >
    </div >
  );
};

export default SignUpPage;
