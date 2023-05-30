
interface SpinnerProps{
    dark: boolean
}

const Spinner: React.FC<SpinnerProps> = (props) => {
    return (
        <div className="spinner">
            <div className={`spinner_item ${props.dark ? 'spinner_item-dark' : ''}`}></div>
        </div>
    )
}

export default Spinner;