import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from "react-leaflet"
import { useAppSelector, useAppDispatch } from "../service/hooks/reduxHooks"
import {Icon, BaseIconOptions, LatLngLiteral } from "leaflet";
import type { OneCityForecast } from "../service/slices/forecastSliceTypes";
import { fetchMarkerForecast, removeMarker } from "../service/slices/geocodingSlice";
import marker from '../assets/marker.svg';
import {useEffect} from 'react';
import Spinner from "./Spinner";
import { v1 } from "uuid";
import {addMarker} from '../service/slices/geocodingSlice';
import { selectImageByCode } from "../service/helpers";

interface MarkerProps {
    markerCoords: LatLngLiteral,
    data: OneCityForecast[];
}

const Map: React.FC = () => {
    const coords = useAppSelector(state => state.forecastReducer.geolocation);
    const totalCoords = (): LatLngLiteral =>{
        return coords?.lat  
                ? {lat: coords.lat, lng: coords.long}
                : {lat:50.45, lng:30.52}
    }
    return(
        <MapContainer  center={totalCoords()} zoom={11} maxZoom={11} className='map' doubleClickZoom={false}>
            <TileLayer zIndex={1}
            attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'  
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyMap/>
            <MapView/>
        </MapContainer>
    )
}

const MyMap: React.FC = () => {
    const markers = useAppSelector(state => state.geocodingReducer.mapMarkersCoords);
    const markersData = useAppSelector(state => state.geocodingReducer.mapMarkers);
    const dispatch = useAppDispatch();
    const map = useMapEvents({
        dblclick(e){
            dispatch(addMarker({lat: e.latlng.lat, lng: e.latlng.lng}))
            dispatch(fetchMarkerForecast({lat: e.latlng.lat, lng: e.latlng.lng}))
        }
    })
    return(
        <>
            {markers.map(el => <MarkerWithPopup markerCoords={el} data={markersData.filter(val => val.coords.lat === el.lat && val.coords.long === el.lng)} key={v1()}/>)}
        </>
    )
}

const MarkerWithPopup: React.FC<MarkerProps> = (props) => {
    const dispatch = useAppDispatch();
    const markerLoading = useAppSelector(state => state.geocodingReducer.mapMarkerForecastLoading);
    const myIcon: BaseIconOptions = {
        iconUrl: marker,
        iconSize: [42, 42],
    };
    const handleButtonClick = () =>{
        dispatch(removeMarker(props.markerCoords))
    }
    return( 
        <Marker icon={new Icon(myIcon)} position={props.markerCoords}>
            <Popup className="map_customPopup" >
                {(markerLoading) ?  
                <Spinner dark={true}/>:
                <>
                    <h3>{props.data ? props.data[0]?.name : null}</h3>
                    <img src={props.data ? selectImageByCode(props.data[0]?.weathercode)[0] : ''} alt="" />
                    <h2>{props.data ? props.data[0]?.temperature : null}&#176;</h2>
                    <button onClick={handleButtonClick}>Delete</button>
                </>}
            </Popup>
        </Marker>
    )
}

const MapView: React.FC = () =>{
    const searchCoords = useAppSelector(state => state.geocodingReducer.searchPanelCoords)
    const map = useMap();
    useEffect(()=> {
        if(searchCoords) {
            map.flyTo(searchCoords);
        }
    }, [searchCoords])
    return null;
}

export default Map