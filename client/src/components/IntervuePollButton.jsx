import React from 'react';
import sparkle from '../assets/sparkle.png';

const IntervuePollButton = () => {
  return (
    <button className='flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition my-4'>
      <img src={sparkle} alt='' className='w-6 h-6 filter invert' />
      <span>Intervue Poll</span>
    </button>
  );
};

export default IntervuePollButton;
