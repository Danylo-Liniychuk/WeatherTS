

const Air: React.FC = () => {
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
                        <div className="air_value">30&#176;</div>
                    </div>
                    <div className="air_item">
                        <div className="air_title air_title-drop">Chance of rain</div>
                        <div className="air_value">0%</div>
                    </div>
                </div>
                <div className="air_block">
                    <div className="air_item">
                        <div className="air_title air_title-wind">Wind</div>
                        <div className="air_value">0.2 km/h</div>
                    </div>
                    <div className="air_item">
                        <div className="air_title air_title-sun">UV Index</div>
                        <div className="air_value">3</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Air