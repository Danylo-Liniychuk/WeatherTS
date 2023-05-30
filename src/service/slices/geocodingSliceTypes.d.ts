import type { Point } from "./mainSlice";

export interface AutoCompleteResponse {
    place_id: string;
    osm_id: string;
    osm_type: string;
    licence: string;
    lat: string;
    lon: string;
    boundingbox: Array<string>;
    class: string;
    type: string;
    display_name: string;
    display_place: string;
    display_address: string;
    address: Adress;

}

interface Adress {
    name: string;
    county: string;
    state: string;
    country: string;
    country_code: string;
}

export interface Matches {
    display_name: string;
    display_place: string;
    coords: Point;
    
}


