import React, { useEffect, useState } from 'react';
import IntervuePollButton from '../components/IntervuePollButton';
import CircularLoader from '../components/CircularLoader';
import { socket } from '../Socket';

export default function StudentPage() {
  const [name, setName] = useState(localStorage.getItem('studentName') || '');
  const [currentPoll, setCurrentPoll] = useState(null);
  const [answer, setAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    socket.on('poll:new', (poll) => {
      setCurrentPoll(poll);
      setShowResults(false);
    });
    socket.on('poll:results', (data) => {
      setResults(data);
      setShowResults(true);
    });
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected!', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });
  }, []);

  const submitAnswer = () => {
    if (!name || !answer) return;
    socket.emit('student:submit_answer', { name, answer });
  };

  if (!name) {
    return (
      <div className='text-center flex justify-center items-center h-screen'>
        <div className='w-[40%]'>
          <div className='flex items-center justify-center'>
            <IntervuePollButton />
          </div>
          <h1 className='text-3xl font-bold mb-2'>
            Let's <span className='text-black'>Get Started</span>
          </h1>
          <p className='text-gray-500 mb-6'>
            If you’re a student, you’ll be able to{' '}
            <strong>submit your answers</strong>, participate in live polls, and
            see how your responses compare with your classmates.
          </p>
          <div className='text-left w-[80%] mx-auto'>
            <label className='block mb-2'>Enter your Name</label>
            <input
              onBlur={(e) => {
                localStorage.setItem('studentName', e.target.value);
                setName(e.target.value);
              }}
              className='w-full p-3 bg-gray-100 rounded'
              placeholder='Your name'
            />
          </div>
          <button
            onClick={() => {}}
            className='mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-darkish'
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-xl mx-auto flex items-center justify-center min-h-screen'>
      <div className='w-full'>
        {currentPoll ? (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Question 1</h2>
              <span className='text-red-500 font-medium'>
                ⏱️ {currentPoll.timeout}
              </span>
            </div>
            <div className='bg-gray-100 p-4 rounded-t-md font-medium'>
              {currentPoll.question}
            </div>
            <div className='border rounded-b-md border-t-0 overflow-hidden'>
              {currentPoll.options.map((opt, i) => (
                <label key={i} className='block cursor-pointer border-t'>
                  <div
                    className={`flex items-center px-4 py-3 space-x-2 ${
                      answer === opt ? 'bg-purple-100' : ''
                    }`}
                  >
                    <input
                      type='radio'
                      name='answer'
                      value={opt}
                      checked={answer === opt}
                      onChange={() => setAnswer(opt)}
                    />
                    <span>{opt}</span>
                  </div>
                </label>
              ))}
            </div>
            <button
              onClick={submitAnswer}
              className='bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 mt-4'
            >
              Submit
            </button>
          </div>
        ) : showResults ? (
          <div>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Question 1</h2>
              <span className='text-red-500 font-medium'>⏱️ 00:15</span>
            </div>
            <div className='bg-gray-100 p-4 rounded-t-md font-medium'>
              {currentPoll?.question || 'Poll ended'}
            </div>
            <div className='border rounded-b-md border-t-0 overflow-hidden'>
              {currentPoll?.options.map((opt, i) => {
                const count = Object.values(results).filter(
                  (ans) => ans === opt
                ).length;
                const total = Object.values(results).length;
                const percent =
                  total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={i} className='px-4 py-3 border-t'>
                    <div className='flex justify-between text-sm'>
                      <span>{opt}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className='h-2 bg-purple-200 rounded-full mt-1'>
                      <div
                        className='bg-purple-600 h-2 rounded-full'
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className='mt-6 text-center font-medium text-gray-600'>
              Wait for the teacher to ask a new question..
            </p>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center text-xl text-gray-500 font-medium'>
            <CircularLoader />
            <p>Waiting for the teacher to ask a question...</p>
          </div>
        )}
      </div>
    </div>
  );
}
