import { useAppDispatch } from "../service/hooks/reduxHooks";
import { toggleSwitcher } from "../service/store/mainSlice";

import type { ToggleProp } from "../service/store/mainSlice";


interface SwitcherProps {
    switchStatus: boolean,
    name: ToggleProp

}

const SwitcherItem: React.FC<SwitcherProps> = (props) => {
    const dispatch = useAppDispatch();
    return(
        <label className={(props.switchStatus) ? "toggle toggle-active" : "toggle"}>
            <input type="checkbox"
                checked={props.switchStatus}
                onChange={() => dispatch(toggleSwitcher(props.name))}
                name={props.name}/>
            <div></div>
        </label>
    )
}

export default SwitcherItem;