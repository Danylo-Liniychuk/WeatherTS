import { useAppSelector, useAppDispatch } from '../service/hooks/reduxHooks';
import { useEffect } from 'react';

import MainPage from '../pages/MainPage';
import CitiesPage from '../pages/CitiesPage';
import SettingsPage from '../pages/SettingsPage';
import Nav from './Navigation';
import MapPage from '../pages/MapPage';
import { changeScreenWidth, addGeolocation } from '../service/store/mainSlice';
import type { Point } from '../service/store/mainSlice';

import "../style/style.scss";
import 'leaflet/dist/leaflet.css';



function App() {
  const currentPage = useAppSelector(state => state.currentPage),
        screenWidth = useAppSelector(state => state.screenWidth),
        dispatch = useAppDispatch();


  useEffect(()=> {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates: Point = {lat: position.coords.latitude, long: position.coords.longitude};
          dispatch(addGeolocation(coordinates));
        },
        (error) => {
          console.log(error.message)
        });
    }
  }, [])


  useEffect(() => {
    dispatch(changeScreenWidth(window.innerWidth));
  }, [])

  
  useEffect(() => {
    const handleResize = () => {
      dispatch(changeScreenWidth(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="App">
      {(screenWidth >= 576) ? <Nav/> : null}
      {(currentPage === 'Weather') ? <MainPage/> : null}
      {(currentPage === 'Cities') ? <CitiesPage/> : null}
      {(currentPage === 'Map') ? <MapPage/> : null}
      {(currentPage === 'Settings') ? <SettingsPage/> : null}
    </div>
  );
}

export default App;
