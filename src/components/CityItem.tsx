import { cityInfo } from "../pages/CitiesPage"
import sunny from '../assets/icons/sunny.svg' 


interface cityProps{
    data: cityInfo
}

const City: React.FC<cityProps> = (props) => {
    const {name, time, temp} = props.data;
    return(
        <>
            <div className='city_item'>
                <div className='city_mini'>
                    <div className="city_info">
                        <img src={sunny} alt="status" />
                        <div> {name}
                              <h3>{time}</h3>
                        </div>
                    </div>
                    <div className="city_temp">{temp}&#176;</div>
                </div>
            </div>
        </>
    )
}

export default City