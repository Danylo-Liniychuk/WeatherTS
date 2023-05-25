import Nav from "../components/Navigation";
import Total from "../components/Total";
import Week from "../components/WeekForecast";
import sunny from '../assets/icons/sunny.svg';
import Today from "../components/TodayForecast";
import Air from "../components/AirConditions";
import { useAppSelector, useAppDispatch} from "../service/hooks/reduxHooks";
import { useEffect } from "react";
import { FetchMainForecast } from "../service/store/mainSlice";

export type weekTuple = [string, string, number, number]
export type weekArr = Array<weekTuple>;

const MainPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.screenWidth);
    const coords = useAppSelector(state => state.geolocation);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(coords) {
            dispatch(FetchMainForecast())
        }

    }, [coords])


    const arrToday: Array<Array<string>> = [['6:00', '25', sunny],
                                            ['6:00', '25', sunny],
                                            ['6:00', '25', sunny],
                                            ['6:00', '25', sunny],
                                            ['6:00', '25', sunny],
                                            ['6:00', '25', sunny]];

    const weakArr: weekArr = [['Today', sunny, 36, 22],
                                ['Today', sunny, 36, 22],
                                ['Today', sunny, 36, 22],
                                ['Today', sunny, 36, 22],
                                ['Today', sunny, 36, 22],
                                ['Today', sunny, 36, 22],
                                ['Today', sunny, 36, 22]];
    
    return(
        <>
           <div className="contentBox">
                <div className="search">
                    {(screenWidth < 576) ? <Nav/> : null}
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <Total/>
                <Today data={arrToday} />
                <Air/>
                {(screenWidth <= 768) ? <Week data={weakArr}/> : null}
           </div>
           {(screenWidth > 768) ? <Week data={weakArr}/> : null}
        </>
    )
}

export default MainPage