import Search from "../components/SearchPanel";
import Total from "../components/Total";
import Week from "../components/WeekForecast";
import Today from "../components/TodayForecast";
import Air from "../components/AirConditions";
import Spinner from "../components/Spinner";
import { useAppSelector, useAppDispatch} from "../service/hooks/reduxHooks";
import { useEffect } from "react";
import { fetchWeekForecast, fetchTodaysForecast,getMainTotalData } from "../service/slices/forecastSlice";


const MainPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth),
          coords = useAppSelector(state => state.forecastReducer?.geolocation),
          {temperature, weatherCode, probability, title} = useAppSelector(getMainTotalData),
          daily = useAppSelector(state => state.forecastReducer.dailyWeekForecast),
          hourly = useAppSelector(state => state.forecastReducer?.todayHourly),
          mainLoading = useAppSelector(state => state.forecastReducer.mainForecastLoading);
    const time = hourly.time.map(el => el.slice(11));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(coords){
            dispatch(fetchWeekForecast());
            dispatch(fetchTodaysForecast());
        }
    }, [coords])
    
    return(
        <>
           <div className="contentBox">
                <Search/>
                {mainLoading ? <Spinner dark={false}/> : 
                <>
                    <Total name={title} probability={probability ? probability[0] : 0} temperature={temperature} weatherCode={weatherCode}/>
                    <Today time={time} temperature={hourly.temperature_2m} weatherCode={hourly.weathercode} />
                    <Air/>
                </>}
                {(screenWidth <= 768) ? <Week daily={daily}/> : null}
           </div>
           {(screenWidth > 768) ? <Week daily={daily}/> : null}
        </>
    )
}

export default MainPage