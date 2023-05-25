import Total from "./Total";
import Today from "./TodayForecast";
import Week from "./WeekForecast";
import sunny from '../assets/icons/sunny.svg';
import { weekTuple } from "../pages/MainPage";

const CityForecast: React.FC = () => {
    const arr:Array<Array<string>> = [['6:00', '25', sunny],
                 ['6:00', '25', sunny],
                 ['6:00', '25', sunny]];

    const weakArr:Array<weekTuple> = [['Today', sunny, 36, 22],
                     ['Today', sunny, 36, 22],
                     ['Today', sunny, 36, 22]];
    return(
        <div className="cityForecast">
            <div className="cityForecast_wrapper">
                <Total/>
                <div className="divider-city"></div>
                <Today data={arr}/>
                <div className="divider-city"></div>
                <Week data={weakArr}/>
            </div>
        </div>
    )
}

export default CityForecast