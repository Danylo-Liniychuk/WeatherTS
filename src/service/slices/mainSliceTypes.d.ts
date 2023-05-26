export interface MapData {
    coords: Point,
    zoom: number,
    markers: Array<Point>
}

export interface Settings {
    temperature: string,
    speed: string,
    pressure: string,
    precipitation: string,
    distance: string,
}

export interface Toggle {
    notifications : boolean;
    time: boolean;
    location: boolean;
}


export type SettingsProp = keyof Settings;
export type ToggleProp = keyof Toggle;
