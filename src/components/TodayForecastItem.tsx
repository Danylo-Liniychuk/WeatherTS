
interface itemProps{
    data: Array<string>
}

const TodayForecastItem: React.FC<itemProps> = (props) => {
    const [time, temp, src] = props.data;
    return(
        <>
            <div className="forecast_item">
                <div className="forecast_time">{time} AM</div>
                <img src={src} alt="status"/>
                <div className="forecast_temperature">{temp}&#176;</div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default TodayForecastItem;