export interface MainForecastResponse {
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
}

export interface DailyWeekForecast {
    time: Array<string>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    weathercode: Array<number>;
}