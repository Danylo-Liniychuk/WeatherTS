import Total from "./Total";
import Today from "./TodayForecast";
import Week from "./WeekForecast";
import Spinner from "./Spinner";
import {useEffect} from 'react';
import type { OneCityForecast } from "../service/slices/forecastSliceTypes";
import { getMainTotalData, getCityTotalData, fetchOneCityWeekForecast} from "../service/slices/forecastSlice";
import { useAppSelector,useAppDispatch } from "../service/hooks/reduxHooks";

interface CityForecastProps {
    cities: OneCityForecast[]
}

const CityForecast: React.FC<CityForecastProps> = (props) => {
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth),
          dispatch = useAppDispatch(),
          hourly = useAppSelector(state => state.forecastReducer?.todayHourly),
          daily = useAppSelector(state => state.forecastReducer.dailyWeekForecast),
          weekForecastLoading = useAppSelector(state => state.forecastReducer.cityWeekLoading),
          dailyCity = useAppSelector(state => state.forecastReducer.cityForecast.threeDays),
          hourlyCity = useAppSelector(state => state.forecastReducer.cityForecast.hourly);

    const {temperature, weatherCode, probability, title} = useAppSelector(getMainTotalData),
          {cityTemp,cityCode,cityProb,cityName} = useAppSelector(getCityTotalData);


    const time = hourly.time.map(el => el.slice(11));
    const cityTime = hourlyCity.time.map(el => el.slice(11))

    useEffect(() => {
        if(props.cities.length === 1){
            dispatch(fetchOneCityWeekForecast([props.cities[0].name, props.cities[0].coords]))
        }
    }, [props.cities])

    return(
        <div className="cityForecast">
            {weekForecastLoading ? 
            <Spinner dark={false}/> : 

            <div className="cityForecast_wrapper">
                {(screenWidth < 576) ? null : 
                cityName ? <Total name={cityName} probability={cityProb ? cityProb[0] : 0} temperature={cityTemp} weatherCode={cityCode}/> :
                           <Total name={title} probability={probability ? probability[0] : 0} temperature={temperature} weatherCode={weatherCode}/>}
                {(screenWidth < 576) ? null :<div className="divider-city"></div>}
                {(hourlyCity.time.length > 0) ? 
                <Today time={cityTime} temperature={hourlyCity.temperature_2m} weatherCode={hourlyCity.weathercode} />:
                <Today time={time} temperature={hourly.temperature_2m} weatherCode={hourly.weathercode} />}
                
                <div className="divider-city"></div>
                <Week daily={dailyCity.time[0] ? dailyCity : daily}/>
            </div>}
        </div>
    )
}

export default CityForecast