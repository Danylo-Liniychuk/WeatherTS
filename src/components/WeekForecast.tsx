import { weekArr } from "../pages/MainPage"
import { v1 } from 'uuid';
import WeekListItem from "./WeekListItem";



interface weekForecastProps{
    data: weekArr;
}

const Week: React.FC<weekForecastProps> = (props) => {

    const createListItem = () => {
        return props.data.map(el=> <WeekListItem data={el} key={v1()}/>)
    }
    return(
        <article className='weekForecast'>
            <div className='weekForecast_wrapper'>
                <div className="weekForecast_title"><h3>{'7-DAY FORECAST'}</h3></div>
                {createListItem()}
            </div>
        </article>
    )
}


export default Week;