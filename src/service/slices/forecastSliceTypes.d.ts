import { Point } from "./mainSlice";

export interface WeekForecastResponse { // Interfaces for responses
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds:number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        weathercode: string;
    }
    daily: DailyWeekForecast;
    hourly: HourlyDayForecast;
    hourly_units?: {
        time: string;
        temperature_2: string;
        weathercode: string;
    };
    current_weather: CurrentWeather;


}

interface OneDayForecastResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds:number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: CurrentWeather
    hourly_units: {
        time: string;
        temperature_2: string;
        weathercode: string;
    }
    hourly: HourlyDayForecast;
    daily_units: {
        time: string,
        apparent_temperature_max: string,
        windspeed_10m_max: string,
        uv_index_max: "",
        rain_sum: string
    }
    daily: AdditionalCurrentParams;

}
export type MainPageForecast = [OneDayForecastResponse, ReverseGeocodingResponse];

interface ReverseGeocodingResponse {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    lat:  string;
    lon: string;
    display_name:string;
    address: {
        house_number: string;
        road: string;
        town: string;
        city: string;
        village: string;
        locality: string;
        municipality: string;
        district: string;
        state: string;
        postcode: string;
        country: string;
        country_code: string;
    }
    boundingbox: Array<string>
}

export interface HourlyDayForecast{
    time: Array<string>;
    temperature_2m: Array<number>;
    weathercode: Array<number>;
}

export interface AdditionalCurrentParams {
    time?: string;
    apparent_temperature_max: Array<number>;
    windspeed_10m_max: Array<number>;
    uv_index_max: Array<number>;
    precipitation_probability_mean: Array<number>;
}

export interface DailyWeekForecast {
    time: Array<string>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    weathercode: Array<number>;
    precipitation?: number[];
}

export interface CurrentWeather{
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
}

export interface OneCityForecast {
    weathercode: number;
    name: string;
    temperature: number;
    coords: Point;
}


export interface CityWeekForecast {
    name?: string;
    temperature?: number;
    weatherCode?:number;
    hourly: HourlyDayForecast;
    threeDays: DailyWeekForecast;
}



