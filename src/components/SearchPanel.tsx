import { useAppSelector, useAppDispatch } from "../service/hooks/reduxHooks";
import {useState, useEffect} from 'react';
import type { Point } from "../service/slices/mainSlice";
import { fetchAutoComplete, cleanMatches, addSearchPanelCoords} from "../service/slices/geocodingSlice";
import { fetchOneCityForecast } from "../service/slices/forecastSlice";
import { v1 } from "uuid";
import { addGeolocation} from '../service/slices/forecastSlice';
import Nav from "./Navigation";


const Search: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth),
          currentPage = useAppSelector(state => state.mainReducer.currentPage),
          matches = useAppSelector(state => state.geocodingReducer?.matches);


    useEffect(() => {
        if(!text) {
            dispatch(cleanMatches());
        } else{
            dispatch(fetchAutoComplete(text));
        }
    },[text])

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setText(e.target.value);
    }
    const handleClick = (name: string, coords: Point) => {
        if(currentPage === 'Weather'){
            dispatch(addGeolocation(coords))
        } else if (currentPage === 'Cities'){
            dispatch(fetchOneCityForecast([name, coords]))
        } else if (currentPage === "Map") {
            dispatch(addSearchPanelCoords({lat: coords.lat, lng: coords.long}))
        }
        setText('')
    }
    return(
        <div className='search'>
            {(screenWidth < 576) ? <Nav/> : null}
            <div className="search_wrapper">
                <input className={(matches && matches.length > 0) ? 'active' : '' } type="text" placeholder="Search for cities" value={text} onChange={handleChange}/>
                {(matches && matches.length > 0) ? 
                    <div className="matchBox">
                            {matches.map(el => <li onClick={() => handleClick(el.display_place, el.coords)} key={v1()}>{el.display_place}<br/><span>{el.display_name}</span></li>)}
                    </div>
                : null}
            </div>
        </div>
    )
}


export default Search