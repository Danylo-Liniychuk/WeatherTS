import Search from "../components/SearchPanel";
import SeasonChart from "../components/charts/SeasonChart";
import WeatherConditions from "../components/charts/WeatherConditions";
import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "../service/hooks/reduxHooks";
import { fetchSeasonWeather } from "../service/slices/statsSlice";


const StatsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchSeasonWeather({}))
    },[])

    return(
        <>
            <div className="contentBox contentBox-charts">
                <Search/>
                <SeasonChart/>
                <WeatherConditions/>
            </div>
        </>
    )
}

export default StatsPage;