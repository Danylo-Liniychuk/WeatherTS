import TodayForecastItem from "./TodayForecastItem"
import { v1 } from "uuid"
import { useAppSelector } from "../service/hooks/reduxHooks"


export interface TodayForecastProps {
    time: Array<string>;
    temperature: Array<number>;
    weatherCode: Array<number>;

}

const Today: React.FC<TodayForecastProps>= (props) => {
    const currentPage = useAppSelector(state => state.mainReducer.currentPage)
    const {temperature,time,weatherCode} = props

    const createForecastIntems = () => {
        const list = [];
        for(let i = 0; i < time.length; i++){
            list.push(<TodayForecastItem time={time[i]} temperature={temperature[i]} weatherCode={weatherCode[i]}  key={v1()}/>)
        }
        return list;
    }

    return(
        <>
            <div className={(currentPage === 'Cities') ? "forecast forecast-city" : 'forecast'}>
            <h3 id = {(currentPage === 'Cities') ? "todayh3" : undefined}>TODAY'S FORECAST</h3>
                <div className="forecast_wrapper">
                    {createForecastIntems()}
                </div>
            </div>
        </>
    )
}

export default Today
