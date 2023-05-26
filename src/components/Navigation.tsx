import logo from '../assets/logo.svg';
import {ReactComponent as Cities} from '../assets/navigation/list_icon.svg';
import {ReactComponent as Map} from '../assets/navigation/map_icon.svg';
import {ReactComponent as Settings} from '../assets/navigation/settings_icon.svg';
import {ReactComponent as Weather} from '../assets/navigation/weather_icon.svg';
import { useAppDispatch, useAppSelector} from '../service/hooks/reduxHooks';
import { changeCurrentPage} from '../service/slices/mainSlice';
import {useState} from 'react'

type SVGimg = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
type itemTuple = [SVGimg, string];


const Nav: React.FC = () => {
    const data: Array<itemTuple> = [[Weather, 'Weather'],
                                    [Cities, 'Cities'],
                                    [Map, 'Map'],
                                    [Settings, 'Settings']];

    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(state => state.mainReducer.currentPage);
    const screenWidth = useAppSelector(state => state.mainReducer.screenWidth)
    const [isMenuOpen, setMenuStatus] = useState(false)
    const onClickHandler = (value:string) => {
        dispatch(changeCurrentPage(value))
    }

    const listItemCreator = (Img:SVGimg, name:string, key:number) => {
        return (
            <div className={`navigation_item ${(currentPage === name) ? 'navigation_item-active': ''}`} 
                 key={key} 
                 onClick={() => onClickHandler(name)}>
                <Img className={`navigation_image ${(currentPage === name) ? 'navigation_image-active': ''}`} 
                     fill={(name === 'Weather') ? '#A29993' : 'none'}
                     style={(currentPage === 'Map' && name != 'Weather') ? {"fill": 'none'} : undefined}/>
                <div>{name}</div>
            </div>
        )
    }
    return (
        <>
            <nav className="navigation">
                <div className="logo" onClick={() => setMenuStatus(!isMenuOpen)}>
                    <img src={logo} alt="logo"/>
                </div>
                {(screenWidth > 576) ?

                <>{data.map((item, pos) => listItemCreator(item[0], item[1], pos))}</>: 

                <div className={(isMenuOpen)? "navigation__list navigation__list--active": "navigation__list"}>
                    {data.map((item, pos) => listItemCreator(item[0], item[1], pos))}
                </div>
                }
            </nav>
        </>
    )
}

export default Nav;