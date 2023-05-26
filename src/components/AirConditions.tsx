
import { useAppSelector } from "../service/hooks/reduxHooks";


const Air: React.FC = () => {
    const additional = useAppSelector(state => state.forecastReducer.currentAdditional);
    return (
        <div className="air">
            <div className="air_header">
                <h3>AIR CONDITIONS</h3>
                <button>See more</button>
            </div>
            <div className="air_wrapper">
                <div className="air_block">
                    <div className="air_item">
                        <div className="air_title air_title-temp">Real Feel</div>
                        <div className="air_value">{additional?.apparent_temperature_max[0]}&#176;</div>
                    </div>
                    <div className="air_item">
                        <div className="air_title air_title-drop">Chance of rain</div>
                        <div className="air_value">{additional?.precipitation_probability_mean[0]}%</div>
                    </div>
                </div>
                <div className="air_block">
                    <div className="air_item">
                        <div className="air_title air_title-wind">Wind</div>
                        <div className="air_value">{additional?.windspeed_10m_max[0]} km/h</div>
                    </div>
                    <div className="air_item">
                        <div className="air_title air_title-sun">UV Index</div>
                        <div className="air_value">{additional?.uv_index_max[0]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Air