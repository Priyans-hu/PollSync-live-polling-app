import React, { useState } from 'react';
import { io } from 'socket.io-client';
import IntervuePollButton from '../components/IntervuePollButton';
const socket = io(process.env.REACT_APP_BACKEND_URL);

export default function TeacherPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [timeout, setTimeoutValue] = useState(60);
  const [responses, setResponses] = useState({});

  const handleCreatePoll = () => {
    socket.emit('teacher:create_poll', {
      question,
      options,
      timeout,
    });
  };

  socket.on('poll:update', (data) => {
    setResponses(data);
  });

  socket.on('poll:results', (data) => {
    setResponses(data);
  });

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <div className='my-4 mb-6'>
        <IntervuePollButton />
        <h1 className='text-xl font-bold mb-4'>Let's Get Started</h1>
        <p className='text-grayish'>
          You'll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </p>
      </div>

      <div>
        <label className='font-bold' htmlFor='enterQuestion'>
          Enter your question
        </label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder='Enter your question'
          className='border p-2 mb-2 w-full'
        />
        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            placeholder={`Option ${i + 1}`}
            className='border p-2 mb-1 w-full'
          />
        ))}
        <input
          type='number'
          value={timeout}
          onChange={(e) => setTimeoutValue(e.target.value)}
          className='border p-2 mb-2 w-full'
        />
        <button
          onClick={handleCreatePoll}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Start Poll
        </button>
        <h2 className='mt-6 font-semibold'>Responses:</h2>
        <ul>
          {Object.entries(responses).map(([name, ans]) => (
            <li key={name}>
              {name}: {ans}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
