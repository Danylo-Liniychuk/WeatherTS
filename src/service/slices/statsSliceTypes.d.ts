export interface SeasonWeatherResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
        time: string;
        temperature_2m_max: string;
    },
    daily:{ 
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    }
}

export interface SeasonWeather {
    date: string[];
    temperatureMax: number[];
    temperatureMin: number[];
}