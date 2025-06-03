
import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OnBoardPage from './pages/OnBoardPage.jsx';
import NotificationsPage from './pages/NotificationPage.jsx';
import CallPage from './pages/CallPage.jsx';
import { PrivateRouter } from './components/PrivateRoute.js';



function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRouter><HomePage /></PrivateRouter>} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/onboarding' element={<PrivateRouter><OnBoardPage /></PrivateRouter>} />
        <Route path='/notification' element={<PrivateRouter><NotificationsPage /></PrivateRouter>} />
        <Route path='/call' element={<PrivateRouter><CallPage /></PrivateRouter>} />
      </Routes>
    </>
  );
}

export default App;
