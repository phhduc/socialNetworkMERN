import './App.css';
import Header from './components/Header/index';
import Post from './components/Post/index'
import React from 'react';

function App() {
  return (
    <div>
    <Header />
      <div>
        <Post />
      </div>
    </div>
  );
}

export default App;
