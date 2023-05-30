import Search from "../components/SearchPanel";
import Units from "../components/SettingsUnits";
import Advertise from "../components/Advertising";
import Switchers from "../components/Switchers";
import { useAppSelector } from "../service/hooks/reduxHooks";

const SettingsPage: React.FC = () => {
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth)
    return(
        <>
            <div className="contentBox">
                <Search/>
                <div className="settings_wrapper">
                    <Units/>
                    <Switchers/>
                    {(screenWidth <= 768) ? <Advertise/> : null}
                </div>
            </div>
            {(screenWidth > 768) ? <Advertise/> : null}
        </>
    )
}

export default SettingsPage