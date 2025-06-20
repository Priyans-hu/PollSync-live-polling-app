# 📊 Live Polling System

A real-time classroom polling application where teachers can ask questions, students can respond live, and results are shown instantly. Built with **React**, **TailwindCSS**, **Express**, and **Socket.IO**.

---

## 🔧 Features

### 👨‍🏫 Teacher

- Create live polls with a question, multiple options, timeout, and correct answer marking
- View responses in real time with a percentage bar chart UI
- View timer countdown synced across clients
- Kick out any student from participating
- View list of connected students (even if they haven't responded yet)
- See previous poll history with full results (persisted on the server)

### 🧑‍🎓 Student

- Enter name once per browser session
- Participate in live polls with auto countdown
- See result bar chart after poll ends
- Gets blocked UI if kicked by the teacher

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js v18+

### 📦 Install dependencies

```bash
# From root
cd client
npm install
cd ../server
npm install
```

### 🖥 Start development

```bash
# Terminal 1 - backend
cd server
npm start

# Terminal 2 - frontend
cd client
npm start
```

Frontend will run at `http://localhost:3000`, backend at `http://localhost:8080`

---

## ⚙️ Environment Variables

In `/client/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8080
```

In `/server/.env`:

```env
CLIENT_URL=http://localhost:3000
```

---

## 🧠 Tech Stack

- **Frontend**: React, TailwindCSS, React Router, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO

---

## 📸 Screens

- `/` → Select Teacher / Student
- `/teacher` → Create poll, view results
- `/student` → Answer poll, view live results

---

Enjoy polling! 🚀
