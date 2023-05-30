import { v1 } from 'uuid';
import Spinner from "./Spinner";
import WeekListItem from "./WeekListItem";
import { useAppSelector } from "../service/hooks/reduxHooks";


interface WeekProps {
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weathercode: number[];
    }
}


const Week: React.FC<WeekProps> = (props) => {
    const currentPage = useAppSelector(state => state.mainReducer.currentPage);
    const mainLoading = useAppSelector(state => state.forecastReducer.weekForecastLoading);
    const days: Array<string> = ['Sun','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', ];
    const {daily} = props;
    const daysOfTheWeek: Array<string> = daily?.time.map (el => {
            const date:number = new Date(el).getDay();
            return days[date];
    })
    const createListItem = () => {
        const listItems = [];
        if(currentPage === 'Weather'){
            for(let i = 0; i < 7; i++){
                const item = <WeekListItem data={[daysOfTheWeek[i], Math.round(daily.temperature_2m_max[i]), Math.round(daily.temperature_2m_min[i]), daily.weathercode[i]]} key={v1()}/>
                listItems.push(item)
            }
        } else if(currentPage === 'Cities') {
            for(let i = 0; i < 3; i++){
                const item = <WeekListItem data={[daysOfTheWeek[i], Math.round(daily.temperature_2m_max[i]), Math.round(daily.temperature_2m_min[i]), daily.weathercode[i]]} key={v1()}/>
                listItems.push(item)
            }
        }
        return listItems;
    }
    return(
        <article className={(currentPage === 'Cities') ? 'weekForecast weekForecast-city': 'weekForecast'}>
            <div className={(currentPage === 'Cities') ? 'weekForecast_wrapper weekForecast_wrapper-city': 'weekForecast_wrapper'}>
            <div className="weekForecast_title"><h3>{(currentPage === 'Cities') ? '3-DAY FORECAST': '7-DAY FORECAST'}</h3></div>
                {(!mainLoading) ? createListItem() : <Spinner dark={false}/>}
            </div>
        </article>
    )
}


export default Week;