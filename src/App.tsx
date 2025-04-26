import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import SearchResults from './pages/SearchResults/SearchResults';
import FyP from './pages/FyP/FyP';
import BlindSpot from './pages/BlindSpot/BlindSpot';
import Global from './pages/Global/Global';
import Discover from './pages/Discover/Discover';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Topics from './pages/Topics/Topics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/fyp" element={<FyP />} />
            <Route path="/global" element={<Global />} />
            <Route path="/blindspot" element={<BlindSpot />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-white shadow-inner py-8">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-500 text-sm">
              <p>NewsPulse Chile © 2023 - Intelligent News Platform</p>
              <p className="mt-2">The platform uses AI to provide objective summaries and detect bias in media coverage</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;