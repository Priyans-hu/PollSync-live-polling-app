import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);

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

  const submitAnswer = () => {
    if (!name) return;
    socket.emit('student:submit_answer', { name, answer });
  };

  if (!name) {
    return (
      <div className='p-6'>
        <h1>Enter your name</h1>
        <input
          onBlur={(e) => {
            localStorage.setItem('studentName', e.target.value);
            setName(e.target.value);
          }}
          className='border p-2'
        />
      </div>
    );
  }

  return (
    <div className='p-6 max-w-xl mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Welcome {name}</h1>
      {currentPoll ? (
        <div>
          <h2 className='font-semibold mb-2'>{currentPoll.question}</h2>
          {currentPoll.options.map((opt, i) => (
            <div key={i}>
              <input
                type='radio'
                name='answer'
                value={opt}
                onChange={() => setAnswer(opt)}
              />{' '}
              {opt}
            </div>
          ))}
          <button
            onClick={submitAnswer}
            className='bg-green-600 text-white px-4 py-2 mt-4'
          >
            Submit
          </button>
        </div>
      ) : (
        <p>No active poll</p>
      )}

      {showResults && (
        <div className='mt-6'>
          <h2 className='font-semibold'>Results:</h2>
          <ul>
            {Object.entries(results).map(([name, ans]) => (
              <li key={name}>
                {name}: {ans}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
