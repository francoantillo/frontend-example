import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bookmark, User, Menu, X, Newspaper, Globe2, Lightbulb, Compass } from 'lucide-react';
import FavoritesPanel from '../FavoritesPanel/FavoritesPanel';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isFavoritesOpen) setIsFavoritesOpen(false);
  };
  const toggleFavorites = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Newspaper className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">NewsPulse</span>
              </Link>
            </div>

            {/* Navigation for desktop */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Newspaper className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link to="/fyp" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Lightbulb className="h-4 w-4 mr-1" />
                For You
              </Link>
              <Link to="/global" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Globe2 className="h-4 w-4 mr-1" />
                Global
              </Link>
              <Link to="/blindspot" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Compass className="h-4 w-4 mr-1" />
                Blind Spot
              </Link>
              <Link to="/discover" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Search className="h-4 w-4 mr-1" />
                Discover
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:block relative w-1/3">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search news, topics, people..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-500"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Favorites Button */}
              <div className="relative">
                <button
                  onClick={toggleFavorites}
                  className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
                  aria-label="Favorites"
                >
                  <Bookmark size={24} />
                </button>
              </div>

              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none"
                  aria-label="Profile"
                >
                  <User size={18} className="text-gray-600" />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/topics"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Topics
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-600 focus:outline-none"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex justify-center mb-4">
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search news, topics, people..."
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="absolute left-3 top-2.5 text-gray-400"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Newspaper className="h-4 w-4 mr-2" />
                  Home
                </Link>
                <Link
                  to="/fyp"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  For You
                </Link>
                <Link
                  to="/global"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe2 className="h-4 w-4 mr-2" />
                  Global
                </Link>
                <Link
                  to="/blindspot"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Compass className="h-4 w-4 mr-2" />
                  Blind Spot
                </Link>
                <Link
                  to="/discover"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Discover
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <FavoritesPanel isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </>
  );
};

export default Header;