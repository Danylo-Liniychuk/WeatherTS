import React from 'react';
import MainPage from '../pages/MainPage';
import CitiesPage from '../pages/CitiesPage';
import SettingsPage from '../pages/SettingsPage';
import Nav from './Navigation';
import MapPage from '../pages/MapPage';
import { useAppSelector } from '../service/hooks/reduxHooks';
import "../style/style.scss";
import 'leaflet/dist/leaflet.css';



function App() {
  const currentPage = useAppSelector(state => state.currentPage);
  return (
    <div className="App">
      <Nav/>
      {(currentPage === 'Weather') ? <MainPage/> : null}
      {(currentPage === 'Cities') ? <CitiesPage/> : null}
      {(currentPage === 'Map') ? <MapPage/> : null}
      {(currentPage === 'Settings') ? <SettingsPage/> : null}
    </div>
  );
}

export default App;
