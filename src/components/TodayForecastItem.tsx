import type { TodayForecastProps } from "./TodayForecast";


interface ItemProps {
    time: string;
    temperature: number;
    weatherCode: number;
}

const TodayForecastItem: React.FC<ItemProps> = (props) => {
    const {time, temperature, weatherCode} = props;
    return(
        <>
            <div className="forecast_item">
                <div className="forecast_time">{time}</div>
                <img src={'https://res.cloudinary.com/dphnruwkk/image/upload/v1685096835/weather_icons/reshot-icon-rain-548NGEBKCJ_vvjdwj.svg'} alt="status"/>
                <div className="forecast_temperature">{temperature}&#176;</div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default TodayForecastItem;