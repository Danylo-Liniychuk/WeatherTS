import React from "react";
import Total from "../components/Total";
import Week from "../components/WeekForecast";
import sunny from '../assets/icons/sunny.svg';
import Today from "../components/TodayForecast";
import Air from "../components/AirConditions";


export type weekTuple = [string, string, number, number]
export type weekArr = Array<weekTuple>;

const MainPage: React.FC = () => {
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
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <Total/>
                <Today data={arrToday} />
                <Air/>
           </div>
           <Week data={weakArr}/>
        </>
    )
}

export default MainPage