import Total from "./Total";
import Today from "./TodayForecast";
import Week from "./WeekForecast";
import sunny from '../assets/icons/sunny.svg';
import { weekTuple } from "../pages/MainPage";
import { useAppSelector } from "../service/hooks/reduxHooks";


const CityForecast: React.FC = () => {
    const screenWidth = useAppSelector(state => state.screenWidth)

    const arr:Array<Array<string>> = [['6:00', '25', sunny],
                 ['6:00', '25', sunny],
                 ['6:00', '25', sunny]];

    const weakArr:Array<weekTuple> = [['Today', sunny, 36, 22],
                     ['Today', sunny, 36, 22],
                     ['Today', sunny, 36, 22]];
    return(
        <div className="cityForecast">
            <div className="cityForecast_wrapper">
                {(screenWidth < 576) ? null : <Total/>}
                {(screenWidth < 576) ? null :<div className="divider-city"></div>}
                <Today data={arr}/>
                <div className="divider-city"></div>
                <Week data={weakArr}/>
            </div>
        </div>
    )
}

export default CityForecast