import { useAppSelector, useAppDispatch } from '../service/hooks/reduxHooks';
import { useEffect } from 'react';

import MainPage from '../pages/MainPage';
import CitiesPage from '../pages/CitiesPage';
import SettingsPage from '../pages/SettingsPage';
import Nav from './Navigation';
import MapPage from '../pages/MapPage';
import StatsPage from '../pages/StatsPage';
import { changeScreenWidth, changeLocationPermission } from '../service/slices/mainSlice';
import { addGeolocation } from '../service/slices/forecastSlice';
import type { Point } from '../service/slices/mainSlice';

import "../style/style.scss";
import 'leaflet/dist/leaflet.css';



function App() {
  const currentPage = useAppSelector(state => state.mainReducer.currentPage),
        screenWidth = useAppSelector(state => state.mainReducer.screenWidth),
        locPermissions = useAppSelector(state => state.mainReducer.locationPermission),
        dispatch = useAppDispatch();


  useEffect(()=> {
    const permissionCheck = () => {
      if(navigator.permissions) {
        navigator.permissions.query({name: 'geolocation'}).then((status) => {
          if(status.state === 'granted'){
            dispatch(changeLocationPermission('granted'))
          } else if(status.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(() =>{
              dispatch(changeLocationPermission('granted'))
            }, (err) => {
              dispatch(changeLocationPermission('denied'))
              console.error(err.message);
            })
          } else{
            dispatch(changeLocationPermission('denied'))
            return
          }
        })
      }
    }
    permissionCheck();
  }, [])

  useEffect(() => {
    if(locPermissions === 'granted'){
      navigator.geolocation.getCurrentPosition((answ) =>{
        dispatch(addGeolocation({lat: answ.coords.latitude, long: answ.coords.longitude}))
      }, (err) => {
        dispatch(addGeolocation({lat: 50.45, long: 30.52}))
        console.error(err.message);
      })
    } else if (locPermissions === 'denied') {
        dispatch(addGeolocation({lat: 50.45, long: 30.52}))
    }
  })

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
      {(currentPage === "Stats") ? <StatsPage/> : null}
    </div>
  );
}

export default App;
