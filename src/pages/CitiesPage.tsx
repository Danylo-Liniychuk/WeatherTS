import Nav from "../components/Navigation";
import { v1 } from "uuid";
import City from "../components/CityItem";
import CityForecast from "../components/CityForecast";
import { useAppSelector } from "../service/hooks/reduxHooks";
import { stat } from "fs";

export interface cityInfo {
    name: string,
    time: string,
    temp:number
}

const CitiesPage: React.FC = () => {

    const screenWidth = useAppSelector(state => state.screenWidth)
    const data:Array<cityInfo> = [{name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31},
                  {name: "Madrid", time: '10:23', temp: 31}]
    return(
        <>
            <div className={(screenWidth >=576) ? "contentBox contentBox-withoutJC": "contentBox"}>
                <div className="search">
                    {(screenWidth < 576) ? <Nav/> : null}
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <div className="city_wrapper">
                    {data.map(el => <City data={el} key={v1()}/>)}
                </div>
            </div>
            {(screenWidth >=576) ? <CityForecast/> : null}
        </>
    )
}

export default CitiesPage;