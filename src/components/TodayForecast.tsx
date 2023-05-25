import TodayForecastItem from "./TodayForecastItem"
import { v1 } from "uuid"


interface todayForecastProps {
    data: Array<Array<string>>
}

const Today: React.FC<todayForecastProps>= (props) => {

    return(
        <>
            <div className='forecast'>
                <h3 id={undefined}>TODAY'S FORECAST</h3>
                <div className="forecast_wrapper">
                    {props.data.map(el => <TodayForecastItem data={el} key={v1()}/>)}
                </div>
            </div>
        </>
    )
}

export default Today
