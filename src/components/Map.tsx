import {MapContainer, TileLayer} from "react-leaflet"

const Map: React.FC = () => {

    return(
        <MapContainer center={{lat:49.8971573, lng:28.57428294586608}} zoom={13} className='map'>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'  
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default Map