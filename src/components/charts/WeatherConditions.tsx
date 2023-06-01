import DoughnutChart from "./DoughnutChart"

const WeatherConditions: React.FC = () => {
    return(
        <div className="chart_wrapper chart_wrapper-flex">
            <div className="chart_doughnut">
                <DoughnutChart/>
            </div>
            <div className="chart_doughnut">
                <DoughnutChart/>
            </div>
        </div>
    )
}

export default WeatherConditions;