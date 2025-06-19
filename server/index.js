import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let currentPoll = null;
let studentResponses = new Map();
let timer = null;

io.on('connection', (socket) => {
  console.log('New client:', socket.id);

  socket.on('teacher:create_poll', ({ question, options, timeout }) => {
    currentPoll = { question, options, timeout, createdAt: Date.now() };
    studentResponses.clear();
    io.emit('poll:new', currentPoll);

    clearTimeout(timer);
    timer = setTimeout(() => {
      io.emit('poll:results', Object.fromEntries(studentResponses));
    }, timeout * 1000);
  });

  socket.on('student:submit_answer', ({ name, answer }) => {
    if (!studentResponses.has(name)) {
      studentResponses.set(name, answer);
    }

    io.emit('poll:update', Object.fromEntries(studentResponses));

    if (studentResponses.size >= 2) {
      clearTimeout(timer);
      io.emit('poll:results', Object.fromEntries(studentResponses));
    }
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
