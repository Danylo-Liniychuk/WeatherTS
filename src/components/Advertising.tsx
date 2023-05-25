

const Advertise: React.FC = () => {
    return(
        <div className="advertise">
        <div className="advertise_wrapper">
            <div className="advertise_promo">
                <h2>Advanced</h2>
                <div className="advertise_divider"></div>
                <h3>Get new experience</h3>
                <ul>
                    <li>Ad free</li>
                    <li>Health activities overview</li>
                    <li>Severe weather notifications</li>
                </ul>
                <div className="advertise_price">
                    <div className="advertise_desc">&#36;5.99/<span>month</span></div>
                </div>
            </div>
            <div className="sign">
                <h2>Never forget your umbrella</h2>
                <div className="advertise_divider"></div>
                <div className="sign_text">Sign up for our daily weather newsletter<br/>
                    personalized just for you
                </div>
                <div className="sign_button">Sign up</div>
            </div>
        </div>
    </div>
    )
}

export default Advertise