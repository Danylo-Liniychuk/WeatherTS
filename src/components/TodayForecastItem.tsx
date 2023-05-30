import type { TodayForecastProps } from "./TodayForecast";
import { selectImageByCode } from "../service/helpers";

interface ItemProps {
    time: string;
    temperature: number;
    weatherCode: number;
}

const TodayForecastItem: React.FC<ItemProps> = (props) => {
    const {time, temperature, weatherCode} = props;
    const image = selectImageByCode(weatherCode);
    return(
        <>
            <div className="forecast_item">
                <div className="forecast_time">{time}</div>
                <img src={image[0]} alt="status"/>
                <div className="forecast_temperature">{temperature}&#176;</div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default TodayForecastItem;