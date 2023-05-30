import { selectImageByCode } from "../service/helpers";

interface props {
    data: [string, number, number, number] ///вернуть weekTuple
}

const WeekListItem:React.FC<props> = (props) => {
    const [day, maxTemp, minTemp, weatherCode] = props.data;
    const image = selectImageByCode(weatherCode);

    return (
        <>
            <div className="weekForecast_item">
                <div className='weekForecast_day'>{day}</div>
                <div className="weekForecast_status">
                    <img src={image[0]} alt="status"/>
                    {image[1]}
                </div>
                <div className="weekForecast_temp"><span>{maxTemp}</span>/{minTemp}</div>
            </div>
            <div className="divider-horizont"></div>
        </>
        
    )
}

export default WeekListItem;