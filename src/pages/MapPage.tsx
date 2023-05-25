import Map from "../components/Map";
import City from "../components/CityItem";
import 'leaflet/dist/leaflet.css';
import { v1 } from "uuid";


export interface cityInfo {
    name: string,
    time: string,
    temp:number
}


const MapPage: React.FC = () => {
    
    const data:Array<cityInfo> = [{name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31}]
    return(
        <>
            <div className="contentBox">
                <div className="search">
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <Map/>
            </div>
            <div className="map_forecast">
                <div className="map_wrapper">
                    {data.map(el => <City data={el} key={v1()}/>)}
                </div>
            </div>
        </>
    )
}

export default MapPage;