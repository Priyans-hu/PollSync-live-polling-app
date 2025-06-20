import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

let currentPoll = null;
let studentResponses = new Map();
let timer = null;
const kickedStudents = new Set();
const activeStudents = new Map();
const pastPolls = []; // stores { question, options, timeout, responses, timestamp }

io.on('connection', (socket) => {
  console.log('New client:', socket.id);

  socket.onAny((event, ...args) => {
    console.log(`[Socket EVENT]:`, event, args);
  });

  socket.on('student:register', (name) => {
    activeStudents.set(socket.id, name);
  });

  socket.on('teacher:create_poll', ({ question, options, timeout }) => {
    currentPoll = { question, options, timeout, createdAt: Date.now() };
    studentResponses.clear();
    io.emit('poll:new', currentPoll);

    clearTimeout(timer);

    timer = setTimeout(() => {
      const results = Object.fromEntries(studentResponses);
      io.emit('poll:results', results);

      if (currentPoll) {
        pastPolls.unshift({
          ...currentPoll,
          responses: results,
        });
      }
    }, timeout * 1000);
  });

  socket.on('student:submit_answer', ({ name, answer }) => {
    if (kickedStudents.has(name)) {
      console.log(`Blocked kicked student: ${name}`);
      socket.emit('student:kick_notice');
      return;
    }

    if (!studentResponses.has(name)) {
      studentResponses.set(name, answer);
    }

    io.emit('poll:update', Object.fromEntries(studentResponses));

    if (studentResponses.size >= 2) {
      clearTimeout(timer);
      io.emit('poll:results', Object.fromEntries(studentResponses));
    }
  });

  socket.on('teacher:kick_student', (studentName) => {
    console.log('Kicking out:', studentName);
    kickedStudents.add(studentName);
    io.emit('student:kicked', studentName);
  });

  socket.on('disconnect', () => {
    activeStudents.delete(socket.id);
  });

  socket.on('teacher:request_student_list', () => {
    const studentList = Array.from(activeStudents.values());
    socket.emit('teacher:student_list', studentList);
  });
});

app.get('/api/past-polls', (req, res) => {
  res.json(pastPolls);
});

server.listen(8080, () => console.log('Server running on port 8080'));
