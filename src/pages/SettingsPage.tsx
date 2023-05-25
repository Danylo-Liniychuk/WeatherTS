import Nav from "../components/Navigation";
import Units from "../components/SettingsUnits";
import Advertise from "../components/Advertising";
import Switchers from "../components/Switchers";


const SettingsPage: React.FC = () => {
    return(
        <>
            <div className="contentBox">
                <div className="search">
                    <input type="text" placeholder="Search for cities"/>
                </div>
                <div className="settings_wrapper">
                    <Units/>
                    <Switchers/>
                </div>
            </div>
            <Advertise/>
        </>
    )
}

export default SettingsPage