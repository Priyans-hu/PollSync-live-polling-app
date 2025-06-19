import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-3xl font-bold mb-8'>Live Polling System</h1>
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
