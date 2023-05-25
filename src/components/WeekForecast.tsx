import { weekArr } from "../pages/MainPage"
import { v1 } from 'uuid';
import WeekListItem from "./WeekListItem";
import { useAppSelector } from "../service/hooks/reduxHooks";


interface weekForecastProps{
    data: weekArr;
}

const Week: React.FC<weekForecastProps> = (props) => {
    const currentPage = useAppSelector(state => state.currentPage);
    const mainLoading = useAppSelector(state => state.mainLoading);
    const days: Array<string> = ['Sun','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', ];
    const daily = useAppSelector(state => state.dailyWeek)
    const daysOfTheWeek: Array<string> = daily?.time.map (el => {
        const date:number = new Date(el).getDay();
        return days[date];
    })
    console.log(daysOfTheWeek)
    const createListItem = () => {
        const listItems = [];
        for(let i = 0; i < 7; i++){
            const item = <WeekListItem data={[daysOfTheWeek[i], daily.temperature_2m_max[i], daily.temperature_2m_min[i]]} key={v1()}/>
            listItems.push(item)
        }
        return listItems;
    }
    return(
        <article className={(currentPage === 'Cities') ? 'weekForecast weekForecast-city': 'weekForecast'}>
            <div className={(currentPage === 'Cities') ? 'weekForecast_wrapper weekForecast_wrapper-city': 'weekForecast_wrapper'}>
            <div className="weekForecast_title"><h3>{(currentPage === 'Cities') ? '3-DAY FORECAST': '7-DAY FORECAST'}</h3></div>
                {(!mainLoading) ? createListItem() : null}
            </div>
        </article>
    )
}


export default Week;