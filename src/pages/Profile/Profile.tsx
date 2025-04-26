import React from 'react';

function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-400">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
              <p className="text-gray-600">Member since January 2024</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Reading Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700">Favorite Topics</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Technology</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Politics</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Science</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700">Reading History</h3>
                <p className="mt-2 text-gray-600">23 articles read this month</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <h2 className="text-xl font-semibold mb-4">Saved Articles</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">No saved articles yet</p>
                <p className="text-gray-600 text-sm mt-1">Your saved articles will appear here</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;