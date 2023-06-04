import DoughnutChart from "./DoughnutChart"
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../service/hooks/reduxHooks";
import { useState, useEffect} from "react";
import { cleanWeatherConditions } from "../../service/slices/statsSlice";
import { selectImageByCode } from "../../service/helpers";


interface ObjData {
    [key: number | string]: number;
}

const WeatherConditions: React.FC = () => {
    const [weathercodes, setWeathercodes] = useState<number[]>([]),
          [hours, setHours] = useState<number[]>([]),
          [sum, setSum] = useState<number[]>([]),
          [days, setDays] = useState<string[]>([]);
    const screeWidth = useAppSelector(state => state.mainReducer.screenWidth)
    const loading = useAppSelector(state => state.statsReducer.seasonWeatherLoading);
    const data = useAppSelector(state => state.statsReducer.weatherConditions);
    const time = useAppSelector(state => state.statsReducer.seasonWeather.date)
    const dispatch = useAppDispatch();
    const monthAlias = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    useEffect(() => {
        if(!loading) {
            setWeathercodes(data.weatherCodes);
            setDays(time);
            setHours(data.precipitation_hours);
            setSum(data.precipitation_sum);
            dispatch(cleanWeatherConditions())
        }
    }, [loading])

    const codesSort = (data: Array<string | number>) => {
        let sorted: ObjData = {};
        const secondsSort: ObjData = {};
        data.forEach((el) => {
          sorted.hasOwnProperty(el) ? sorted[el]++ : sorted[el] = 1; 
        })
        for(let key in sorted) {
            const alias = selectImageByCode(+key)[1];
            secondsSort?.[alias] ? secondsSort[alias] += +sorted[key] : secondsSort[alias] = +sorted[key]
        }
        return secondsSort;
    };

    const getMonthArr = () => {
        const uniqueMonths: string[] = Array.from(new Set<string>(days.map(date => date.split("-")[1])));
        const finalArr = uniqueMonths.map((el) => monthAlias[+el]);
        return finalArr;
    } 

    const preparePrecipitation = (dates: string[], values: number[]) => {
        const data: ObjData = values.reduce((acc, value, i) => {
            const key = days[i].slice(5,7)
            acc[key] ? acc[key] += value : acc[key] = value;
            return acc
        },{} as ObjData) 
        return Object.values(data);
    }

    const monthLabels = getMonthArr();
    const codes = codesSort(weathercodes);
    preparePrecipitation(days, sum);
    return(
        <div className="chart_wrapper chart_wrapper-flex">
            {loading
            ? <Spinner dark={false}/>
            : <>
                <div className="chart_doughnut">
                    <DoughnutChart dataset={Object.values(codes)} label="Days " labels={Object.keys(codes)} title="Weather conditions" position={('left')} legend={(screeWidth < 576) ? false : true}/>
                </div>
                <div className="chart_doughnut">
                    <DoughnutChart dataset={preparePrecipitation(days, sum)} labels={monthLabels} label="Total(mm)" title="Precipitation sum" position={(screeWidth > 568 && screeWidth < 890 )? "right" : 'left' } legend={(screeWidth < 576) ? false : true}/>
                </div>
                <div className="chart_doughnut">
                    <DoughnutChart dataset={preparePrecipitation(days, hours)} labels={monthLabels} label="Rain hours" title="Precipitation hours" position={(screeWidth > 568 && screeWidth < 890 ) ? "bottom" : 'left' } legend={(screeWidth < 576) ? false : true}/>
                </div>            
              </>
            }
        </div>
    )
}

export default WeatherConditions;