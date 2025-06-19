import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntervuePollButton from '../components/IntervuePollButton';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div>
        <IntervuePollButton />
      </div>
      <div className='text-center mb-8'>
        <h1 className='text-3xl'>
          Welcome to the <strong>Live Polling System</strong>
        </h1>
        <p>
          Please select the role that best describes you to begin using the live
          polling system
        </p>
      </div>
      <div className='flex space-x-4'>
        <button
          onClick={() => navigate('/teacher')}
          className='bg-blue-600 text-white px-6 py-3 rounded shadow'
        >
          I'm a Teacher
        </button>
        <button
          onClick={() => navigate('/student')}
          className='bg-green-600 text-white px-6 py-3 rounded shadow'
        >
          I'm a Student
        </button>
      </div>
    </div>
  );
}
