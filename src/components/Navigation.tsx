import logo from '../assets/logo.svg';
import {ReactComponent as Cities} from '../assets/navigation/list_icon.svg';
import {ReactComponent as Map} from '../assets/navigation/map_icon.svg';
import {ReactComponent as Settings} from '../assets/navigation/settings_icon.svg';
import {ReactComponent as Weather} from '../assets/navigation/weather_icon.svg';
import { useAppDispatch, useAppSelector} from '../service/hooks/reduxHooks';
import { changeCurrentPage} from '../service/store/mainSlice';

type SVGimg = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
type itemTuple = [SVGimg, string];


const Nav: React.FC = () => {
    const data: Array<itemTuple> = [[Weather, 'Weather'],
                                    [Cities, 'Cities'],
                                    [Map, 'Map'],
                                    [Settings, 'Settings']];

    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(state => state.currentPage);
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
                     style={(currentPage === 'Map') ? {"fill": 'none'} : undefined}/>
                <div>{name}</div>
            </div>
        )
    }
    return (
        <>
            <nav className="navigation">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                {data.map((item, pos) => listItemCreator(item[0], item[1], pos))}
            </nav>
        </>
    )
}

export default Nav;