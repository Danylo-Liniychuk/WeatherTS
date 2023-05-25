

interface SwitcherProps {
    switchStatus: boolean,
    name: string

}

const SwitcherItem: React.FC<SwitcherProps> = (props) => {
    return(
        <label className={(props.switchStatus) ? "toggle toggle-active" : "toggle"}>
            <input type="checkbox"
                checked={props.switchStatus}
                onChange={() => console.log('switch')}
                name={props.name}/>
            <div></div>
        </label>
    )
}

export default SwitcherItem;