import React from 'react';

function Topics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for topics content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Topic content will be implemented here</h2>
          <p className="text-gray-600">This is a placeholder for the Topics page content.</p>
        </div>
      </div>
    </div>
  );
}

export default Topics;