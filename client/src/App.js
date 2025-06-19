import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/teacher' element={<TeacherPage />} />
        <Route path='/student' element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
