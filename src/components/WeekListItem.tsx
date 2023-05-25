import { weekTuple } from "../pages/MainPage"
import sunny from '../assets/icons/sunny.svg';

interface props {
    data: [string, number, number] ///вернуть weekTuple
}

const WeekListItem:React.FC<props> = (props) => {


    const [day, maxTemp, minTemp] = props.data;

    return (
        <>
            <div className="weekForecast_item">
                <div className='weekForecast_day'>{day}</div>
                <div className="weekForecast_status">
                    <img src={sunny} alt="status"/>
                    Sunny
                </div>
                <div className="weekForecast_temp"><span>{maxTemp}</span>/{minTemp}</div>
            </div>
            <div className="divider-horizont"></div>
        </>
        
    )
}

export default WeekListItem;