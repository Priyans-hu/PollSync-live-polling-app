## 📊 Live Polling System

A real-time web application for conducting live polls between a teacher and multiple students. Built with React, TailwindCSS, Express.js, and Socket.IO. Perfect for classrooms, quizzes, and interactive sessions.

---

## 🔧 Features

### 👨‍🏫 Teacher

- Create a new poll with a question, multiple options, and a timeout (default 60s)
- View live responses from students as they submit answers
- View final results after timeout or when all students have responded

### 🧑‍🎓 Student

- Enter name once per browser tab (session scoped)
- View active poll and answer it
- View results after submission or timeout

### 🔄 Real-Time

- Powered by Socket.IO
- All actions sync instantly between teacher and students

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js 18+

### 📦 Install dependencies

```bash
# From project root
cd client
npm install
cd ../server
npm install
```

### 🖥 Start development

```bash
# Terminal 1
cd server
npm start

# Terminal 2
cd client
npm start
```

Frontend will run on `http://localhost:3000` and connect to backend on `http://localhost:3000` (adjust if ports differ).

---

## 🧠 Tech Stack

- **Frontend:** React, TailwindCSS, React Router, Socket.IO Client
- **Backend:** Express.js, Socket.IO

---

## 📸 Screens

- `/` → Select Teacher / Student
- `/teacher` → Create poll, view results
- `/student` → Answer poll, view live results

---

Happy polling! ✨
