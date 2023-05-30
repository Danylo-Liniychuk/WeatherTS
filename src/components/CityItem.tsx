import { useAppSelector, useAppDispatch } from "../service/hooks/reduxHooks"
import {useState} from 'react'
import { selectImageByCode } from "../service/helpers";
import { addGeolocation, fetchOneCityWeekForecast} from "../service/slices/forecastSlice";
import CityForecast from "./CityForecast";
import type { OneCityForecast } from "../service/slices/forecastSliceTypes";

interface CityProps extends OneCityForecast {
    cities: OneCityForecast[]
}

const City: React.FC<CityProps> = (props) => {
    const {name, temperature, weathercode, coords, cities} = props;
    const [isMoreShown, setMoreStatus] = useState(false)
    const currentPage = useAppSelector(state => state.mainReducer.currentPage);
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth);
    const dispatch = useAppDispatch();

    const createItemClass = () => {
        return currentPage === 'Map'
          ? 'city_item-map'
          : isMoreShown
          ? 'city_item-active'
          : '';
      };
    
    const handleMoreStatus = () => {
        setMoreStatus(!isMoreShown);
        dispatch(fetchOneCityWeekForecast([name, coords]));
    }

    return(
            <div className={`city_item ${createItemClass()}`}
                 onClick={handleMoreStatus}>
                <div className={`city_mini ${(screenWidth < 576 && isMoreShown) ? 'city_mini-active' : ''}`}>
                    <div className="city_info">
                        <img src={selectImageByCode(weathercode)[0]} alt="status" />
                        <div> 
                            {name}
                        </div>
                    </div>
                    <div className="city_temp">{temperature}&#176;</div>
                </div>
                {(screenWidth < 576 && isMoreShown && currentPage !== 'Map') ? <CityForecast cities={cities}/> : null}
            </div>
    )
}

export default City