import { useAppSelector } from "../service/hooks/reduxHooks"
import {useState} from 'react'
import { cityInfo } from "../pages/CitiesPage";
import sunny from '../assets/icons/sunny.svg';
import CityForecast from "./CityForecast";


interface cityProps{
    data: cityInfo
}

const City: React.FC<cityProps> = (props) => {
    const {name, time, temp} = props.data;
    const [isMoreShown, setMoreStatus] = useState(false)
    const currentPage = useAppSelector(state => state.mainReducer.currentPage);
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth);

    const createItemClass = () => {
        return currentPage === 'Map'
          ? 'city_item-map'
          : isMoreShown
          ? 'city_item-active'
          : '';
      };
    
    const handleMoreStatus = () => {
        setMoreStatus(!isMoreShown)
    }

    return(
            <div className={`city_item ${createItemClass()}`}
                 onClick={handleMoreStatus}>
                <div className={`city_mini ${(screenWidth < 576 && isMoreShown) ? 'city_mini-active' : ''}`}>
                    <div className="city_info">
                        <img src={sunny} alt="status" />
                        <div> {name}
                              <h3>{time}</h3>
                        </div>
                    </div>
                    <div className="city_temp">{temp}&#176;</div>
                </div>
                {(screenWidth < 576 && isMoreShown && currentPage !== 'Map') ? <CityForecast/> : null}
            </div>
    )
}

export default City