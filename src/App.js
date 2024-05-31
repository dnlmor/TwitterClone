import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import './App.css';
import './components/Navbar.css';
import './components/Sidebar.css';
import './pages/Home.css';
import './pages/Profile.css';
import './pages/Settings.css';

const App = () => {
  const userId = "user1";

  return (
    <Router>
      <div>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
