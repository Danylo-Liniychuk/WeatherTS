import React from "react";
import sunny from '../assets/icons/sunny.svg';
import { useAppDispatch, useAppSelector } from "../service/hooks/reduxHooks";

const Total: React.FC =  () => {
    const currentPage = useAppSelector(state => state.mainReducer.currentPage),
          title = useAppSelector(state => state.forecastReducer.city),
          temperature = useAppSelector(state => state.forecastReducer.current_weather?.temperature),
          probability = useAppSelector(state => state.forecastReducer.currentAdditional?.precipitation_probability_mean[0])

    return(
        <>
            <div className={(currentPage === 'Cities') ? 'total total-padding0' : 'total'}>
                <div className="total_forecast">
                    <div className="total_city">
                        <h2>{title}</h2>
                        Chanse of rain: {probability}%
                    </div>
                    <div className="total_temperature">{temperature}&#176;</div>
                </div>
                <img src={sunny} alt="status"/>
            </div>
        </>
    )
}

export default Total