import { RadioData } from "./SettingsUnits"
import { v1 } from "uuid"
import { changeUnit } from "../service/store/mainSlice"
import { useAppDispatch } from "../service/hooks/reduxHooks"
import type { SettingsProp } from "../service/store/mainSlice"

interface SettingItemData {
    title: string,
    data: Array<RadioData>,
    active: [string, SettingsProp]
}



const UnitItem: React.FC<SettingItemData> = (props) => {
    const {title, data, active} = props;
    const dispatch = useAppDispatch();
    return(
        <div className="settings_item">
                    <h3>{title}</h3>
                    <div className="settings_switch">
                            {data.map(el => {
                                return(
                                        <input  key={v1()}
                                                name ={title}
                                                type='radio'
                                                checked={(active[0] === el.val) ? true : false}
                                                onChange={() => dispatch(changeUnit({objProp:active[1],value: el.val}))}
                                                placeholder={el.val}/>

                                )
                            })}

                    </div>
                </div>

    )
}

export default UnitItem