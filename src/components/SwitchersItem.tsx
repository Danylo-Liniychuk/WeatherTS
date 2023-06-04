import { useAppDispatch } from "../service/hooks/reduxHooks";
import { toggleSwitcher } from "../service/slices/mainSlice";
import type { ToggleProp } from "../service/slices/mainSliceTypes";
import {useEffect} from 'react'

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