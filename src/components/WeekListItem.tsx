import { weekTuple } from "../pages/MainPage"


interface props {
    data: weekTuple
}

const WeekListItem:React.FC<props> = (props) => {

    const [day, img, maxTemp, minTemp] = props.data;

    return (
        <>
            <div className="weekForecast_item">
                <div className='weekForecast_day'>{day}</div>
                <div className="weekForecast_status">
                    <img src={img} alt="status"/>
                    Sunny
                </div>
                <div className="weekForecast_temp"><span>{maxTemp}</span>/{minTemp}</div>
            </div>
            <div className="divider-horizont"></div>
        </>
        
    )
}

export default WeekListItem;