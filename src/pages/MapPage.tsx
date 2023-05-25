import Map from "../components/Map";
import City from "../components/CityItem";
import Nav from "../components/Navigation";
import 'leaflet/dist/leaflet.css';
import { v1 } from "uuid";
import { useAppSelector } from "../service/hooks/reduxHooks";

export interface cityInfo {
    name: string,
    time: string,
    temp:number
}


const MapPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.screenWidth)
    const data:Array<cityInfo> = [{name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31}]
    const items = 
                <div className="map_forecast">
                        <div className="map_wrapper">
                            {data.map(el => <City data={el} key={v1()}/>)}
                        </div>
                </div>

    return(
        <>
            <div className="contentBox">
                <div className="search">
                    {(screenWidth < 576) ? <Nav/> : null}
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <Map/>
                {(screenWidth <= 768) ? items : null}
            </div>
                {(screenWidth > 768) ? items : null}
            
        </>
    )
}

export default MapPage;