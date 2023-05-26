import UnitItem from "./SettingsUnitItem";
import { v1 } from "uuid";
import { useAppSelector } from "../service/hooks/reduxHooks";


export interface RadioData{
    name: string,
    val: string
}


const Units: React.FC = () => {
    const temperature: Array<RadioData> = [{name:'Celsius', val: 'celsius'},
                                           {name:'Fahrenheit', val: 'fahrenheit'}],
          wind: Array<RadioData> = [{name:'km/h', val: 'km/h'},
                                    {name:'m/s', val: 'm/s'},
                                    {name:'Knots', val: 'Knots'}],
          pressure: Array<RadioData> =  [ {name:'hPa', val: 'hPa'},
                                          {name:'Inches', val: 'inch'},
                                          {name:'kPa', val: 'kPas'},
                                          {name:'mm', val: 'mm'}],
          precipitation: Array<RadioData> = [ {name:'Millimeters', val: 'mm'},
                                              {name:'Inches', val: 'inch'}],
          distance: Array<RadioData> = [ {name:'Kilometers', val: 'km'},
                                         {name:'Miles', val: 'miles'}]
    const settings = useAppSelector(state => state.mainReducer.settings);
    return(
        <>
            <h2>Units</h2>
            <div className="settings_units">
                <UnitItem title="Temperature" data={temperature} key={v1()} active={[settings.temperature, "temperature"]}/>
                <UnitItem title="Wind Speed`" data={wind} key={v1()} active={[settings.speed, "speed"]}/>
                <UnitItem title="Pressure" data={pressure} key={v1()} active={[settings.pressure, "pressure"]}/>
                <UnitItem title="Precipitation" data={precipitation} key={v1()} active={[settings.precipitation, "precipitation"]}/>
                <UnitItem title="Distance" data={distance} key={v1()} active={[settings.distance, "distance"]}/>
            </div>
        </>
    )
}

export default Units