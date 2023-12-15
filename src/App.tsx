import React from 'react';
import './App.css';
import PeopleList from './components/PeopleList/PeopleList';
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import PeopleInfo from './components/PeopleInfo/PeopleInfo';

function App() {
  return (
    <div className="App" data-testid="app-container">

      <Routes>

        <Route
          path='*'
          element={
            <Navigate to='/people' />
          }
        />
        <Route path="/people" element={<PeopleList />} />
        <Route path='/people/:id' element={<PeopleInfo />} />

      </Routes>
    </div>
  );
}

export default App;
