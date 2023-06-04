import LineChart from "./LineChart";
import Spinner from "../Spinner";
import { cleanSeasonData } from "../../service/slices/statsSlice";
import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from "../../service/hooks/reduxHooks";
import type { SeasonWeather } from "../../service/slices/statsSliceTypes";


const SeasonChart: React.FC = () => {
    const [data, setData] = useState<SeasonWeather>();
    const dispatch = useAppDispatch();
    const defaultName = useAppSelector(state => state.forecastReducer.city);
    const name = useAppSelector(state => state.statsReducer.name);
    const loading = useAppSelector(state => state.statsReducer.seasonWeatherLoading);
    const values = useAppSelector(state => state.statsReducer.seasonWeather);

    useEffect(() => {
        if(!loading) {
            setData(values);
            dispatch(cleanSeasonData());
        }
    }, [loading])
    return(
        <div className="chart_wrapper">
            <h2>{name.length > 1 ? name : defaultName}</h2>
            <h3>Max and min temperatures for the last 3 month</h3>
                <div className="chart_graph">
                    {loading || !data
                    ? <Spinner dark={false}/>
                    : <LineChart valueMax={data.temperatureMax} valueMin={data.temperatureMin} labels={data.date}/>
                    }
                </div>
        </div>
    )
}

export default SeasonChart;