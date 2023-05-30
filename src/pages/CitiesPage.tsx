import Search from "../components/SearchPanel";
import { v1 } from "uuid";
import City from "../components/CityItem";
import Spinner from "../components/Spinner";
import CityForecast from "../components/CityForecast";
import { useAppSelector,useAppDispatch} from "../service/hooks/reduxHooks";
import { fetchWeekForecast, fetchTodaysForecast, getCitiesLoading} from "../service/slices/forecastSlice";
import { useEffect } from "react";


const CitiesPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth),
          cities = useAppSelector(state => state.forecastReducer.cities),
          cityWeekLoading = useAppSelector(state => state.forecastReducer.cityWeekLoading);
    return(
        <>
            <div className={(screenWidth >=576) ? "contentBox contentBox-withoutJC": "contentBox"}>
                <Search/>
                <div className={`city_wrapper ${(cities.length > 0) ? '' : 'city_wrapper-empty'}`}>
                    {(cities.length > 0) ? 
                            cities.map(el => <City name={el.name} temperature={el.temperature} weathercode={el.weathercode} coords={el.coords} cities={cities} key={v1()}/>) :
                            <span>Your list of cities is empty</span>}
                </div>
            </div>
            {(screenWidth <= 576) ? null : <CityForecast cities={cities}/>}
        </>
    )
}

export default CitiesPage;