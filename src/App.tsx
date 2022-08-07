import React from 'react';
import './App.css';
import FolderPanel from './components/FolderPanel/FolderPanel';
import ViewPanel from './components/ViewPanel/ViewPanel';

function App() {
  return (
    <div className="App">
      <FolderPanel/>
      <ViewPanel/>
    </div>
  );
}

export default App;
