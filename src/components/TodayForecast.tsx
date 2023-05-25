import TodayForecastItem from "./TodayForecastItem"
import { v1 } from "uuid"
import { useAppSelector } from "../service/hooks/reduxHooks"


interface todayForecastProps {
    data: Array<Array<string>>
}

const Today: React.FC<todayForecastProps>= (props) => {
    const currentPage = useAppSelector(state => state.currentPage)
    return(
        <>
            <div className={(currentPage === 'Cities') ? "forecast forecast-city" : 'forecast'}>
            <h3 id = {(currentPage === 'Cities') ? "todayh3" : undefined}>TODAY'S FORECAST</h3>
                <div className="forecast_wrapper">
                    {props.data.map(el => <TodayForecastItem data={el} key={v1()}/>)}
                </div>
            </div>
        </>
    )
}

export default Today
