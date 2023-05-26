import Nav from "../components/Navigation";
import Total from "../components/Total";
import Week from "../components/WeekForecast";
import sunny from '../assets/icons/sunny.svg';
import Today from "../components/TodayForecast";
import Air from "../components/AirConditions";
import Spinner from "../components/Spinner";
import { useAppSelector, useAppDispatch} from "../service/hooks/reduxHooks";
import { useEffect } from "react";
import { fetchWeekForecast, fetchTodaysForecast } from "../service/slices/forecastSlice";


const MainPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth),
          coords = useAppSelector(state => state.forecastReducer.geolocation),
          hourly = useAppSelector(state => state.forecastReducer?.todayHourly);
    const time = hourly ? hourly.time.map(el => el.slice(11)) : [];
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchWeekForecast());
        dispatch(fetchTodaysForecast());
    }, [coords])
    
    return(
        <>
           <div className="contentBox">
                <div className="search">
                    {(screenWidth < 576) ? <Nav/> : null}
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <Total/>
                {hourly ? <Today time={time} temperature={hourly.temperature_2m} weatherCode={hourly.weathercode} /> : <Spinner/>}
                <Air/>
                {(screenWidth <= 768) ? <Week/> : null}
           </div>
           {(screenWidth > 768) ? <Week/> : null}
        </>
    )
}

export default MainPage