import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import HomePage from './views/pages/HomePage';
import QuestPage from './views/pages/QuestPage';
import MeasurementPage from './views/pages/MeasurementPage';
import ResultPage from './views/pages/ResultPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/quest' element={<QuestPage />}></Route>
      <Route path='/measurement' element={<MeasurementPage />}></Route>
      <Route path='/result' element={<ResultPage />}></Route>
    </Routes>
  );
}
