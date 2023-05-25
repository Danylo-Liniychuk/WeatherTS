import SwitcherItem from "./SwitchersItem"



const Switchers: React.FC = () => {
    return(
        <>
            <div className="notifications">
                <h2>Notifications</h2>
                <div className="notifications_wrapper">
                    <div className="notifications_text">
                        Notifications<br/><span>Be aware of the weather</span>
                    </div>
                    <SwitcherItem switchStatus={true} name="notifications"/>
                </div>
            </div>
            <div className="general">
                <h2>General</h2>
                <div className="general_wrapper">
                    <div className="general_item">
                        <div className="general_text">
                            12-Hours Time
                        </div>
                        <SwitcherItem switchStatus={false} name="time"/>
                    </div>
                    <div className="general_divider"></div>
                    <div className="general_item">
                        <div className="general_text">
                            Location<br/><span>Get weather of tour location</span>
                        </div>
                        <SwitcherItem switchStatus={true} name="location"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Switchers