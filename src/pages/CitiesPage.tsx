import Nav from "../components/Navigation";
import { v1 } from "uuid";
import City from "../components/CityItem";
import CityForecast from "../components/CityForecast";

export interface cityInfo {
    name: string,
    time: string,
    temp:number
}

const CitiesPage: React.FC = () => {

    const data:Array<cityInfo> = [{name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31}]
    return(
        <>
            <div className="contentBox contentBox-withoutJC">
                <div className="search">
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <div className="city_wrapper">
                    {data.map(el => <City data={el} key={v1()}/>)}
                </div>
            </div>
            <CityForecast/>
        </>
    )
}

export default CitiesPage;