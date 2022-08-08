import React, { useEffect } from 'react';
import './App.css';
import FolderPanel from './components/FolderPanel/FolderPanel';
import ViewPanel from './components/ViewPanel/ViewPanel';
import { useAppSelector } from './hooks/hooks';

function App() {

  const { folder, viewPanel, isChangingMode } = useAppSelector(state => state.folder)

  return (
    <div className="App">
      <FolderPanel/>
      <ViewPanel/>
    </div>
  );
}

export default App;
