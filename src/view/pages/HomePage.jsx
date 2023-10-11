import React from 'react';
import SearchBar from '../components/SearchBar';
import FriendlList from '../components/FriendlList';
import ChatPage from "../components/ChatPage"

function HomePage() {
  return (
    <div>
      <nav className="flex sm:justify-center space-x-4 mt-3 mb-14">
        {[
          ['About', '/about'],
          ['Contact', '/contact'],
        ].map(([title, url]) => (
          <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
        ))}
      </nav>
      <div className="flex flex-row">
        <div className='mt-16'>
          <FriendlList />
        </div>
        <div className='mt-16'>
          <ChatPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
