import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-gray-100">
      <div className="max-w-xl p-8 bg-white rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">MTC Bus Transit Analysis Dashboard</h1>
        <div className="border-b-2 border-blue-400 mb-6"></div>
        <p className="text-lg mb-6 text-gray-800">Welcome to the MTC Bus Transit Analysis website. Here's what you can do:</p>
        <ul className="list-none text-lg">
          <li className="mb-4 flex items-center hover:text-blue-600 transition duration-300">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            Analyze Bus Count data.
          </li>
          <li className="mb-4 flex items-center hover:text-blue-600 transition duration-300">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            Analyze Passenger Count data.
          </li>
          <li className="mb-4 flex items-center hover:text-blue-600 transition duration-300">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            Conduct Revenue Analysis.
          </li>
          <li className="mb-4 flex items-center hover:text-blue-600 transition duration-300">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            View Loading Profiles.
          </li>
          <li className="mb-4 flex items-center hover:text-blue-600 transition duration-300">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            Access OD Matrix.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
