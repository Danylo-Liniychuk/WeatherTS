import Map from "../components/Map";
import City from "../components/CityItem";
import Search from "../components/SearchPanel";
import type { OneCityForecast } from "../service/slices/forecastSliceTypes";
import Spinner from "../components/Spinner";
import { v1 } from "uuid";
import { useAppSelector } from "../service/hooks/reduxHooks";
import 'leaflet/dist/leaflet.css';

export interface MapListProps{
    data: OneCityForecast[];
}



const MapPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth);
    const markersData = useAppSelector(state => state.geocodingReducer.mapMarkers);


    return(
        <>
            <div className="contentBox">
                <Search/>
                <Map/>
                {(screenWidth <= 768) ? <MapList data={markersData}/> : null}
            </div>
                {(screenWidth > 768) ? <MapList data={markersData}/> : null}
            
        </>
    )
}

const MapList:React.FC<MapListProps> = (props) => {
    const {data} = props;
    const markerLoading = useAppSelector(state => state.geocodingReducer.mapMarkerForecastLoading)
    return (
        <div className="map_forecast">
            <div className={`map_wrapper ${data.length === 0 ? 'map_wrapper-empty' : ''}`}>
                {data.length > 0 
                ? data.map(el => <City name={el.name} coords={el.coords} temperature={el.temperature} weathercode={el.weathercode} cities={[]} key={v1()}/>)
                : markerLoading ? <Spinner dark={false}/> : <span>Your list of cities is empty</span>}
                {(markerLoading && data.length > 0  )? <div className="spinner_wrapper"><Spinner dark={false}/></div> : null}
            </div>
        </div>
    )
}

export default MapPage;