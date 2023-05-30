import React from "react";
import { selectImageByCode } from "../service/helpers";
import { useAppDispatch, useAppSelector } from "../service/hooks/reduxHooks";

interface TotalProps{
    name: string | undefined;
    probability: number | undefined;
    weatherCode: number | undefined;
    temperature: number | undefined;
}

const Total: React.FC<TotalProps> =  (props) => {
    const currentPage = useAppSelector(state => state.mainReducer.currentPage);
    const {name, probability, temperature, weatherCode} = props;
    const image = (typeof weatherCode === 'number') ? selectImageByCode(weatherCode) : [] ;
    return(
        <>
            <div className={(currentPage === 'Cities') ? 'total total-padding0' : 'total'}>
                <div className="total_forecast">
                    <div className="total_city">
                        <h2>{name}</h2>
                        Chanse of rain: {probability}%
                    </div>
                    <div className="total_temperature">{temperature}&#176;</div>
                </div>
                <img src={image[0]} alt="status"/>
            </div>
        </>
    )
}

export default Total