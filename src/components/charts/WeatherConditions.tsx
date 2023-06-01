import DoughnutChart from "./DoughnutChart"
import { useAppDispatch, useAppSelector } from "../../service/hooks/reduxHooks";
import { useState, useEffect } from "react";
import { cleanWeatherConditions } from "../../service/slices/statsSlice";


const WeatherConditions: React.FC = () => {
    const [weathercodes, setWeathercodes] = useState<number[]>([]);
    const loading = useAppSelector(state => state.statsReducer.seasonWeatherLoading);
    const data = useAppSelector(state => state.statsReducer.weatherConditions.weatherCodes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!loading) {
            setWeathercodes(data);
            dispatch(cleanWeatherConditions())
        }
    }, [loading])
    return(
        <div className="chart_wrapper chart_wrapper-flex">
            <div className="chart_doughnut">
                <DoughnutChart data={weathercodes}/>
            </div>
            <div className="chart_doughnut">
                <DoughnutChart data={weathercodes}/>
            </div>
            <div className="chart_doughnut">
                <DoughnutChart data={weathercodes}/>
            </div>
        </div>
    )
}

export default WeatherConditions;