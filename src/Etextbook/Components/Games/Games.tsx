import styles from './Games.module.css'
import { GamesItem } from "./GamesItem"
import clocks from '../../assets/clocks.svg'
import pencils from '../../assets/pencils.svg'
export interface IGamesItemProps {
    name: string, 
    link: string,
    isActive: boolean,
    img: string,
}
export interface IGamesProps {
    percentage: number
}
export const Games: React.FC<IGamesProps> = (props) => {
    return (
    <div className={styles.tile__container}>
        <GamesItem img={pencils} name='Аудивызов' link ='/' isActive ={props.percentage === 100 ? true: false }/>
        <GamesItem img={clocks} name='Спринт' link ='/' isActive ={props.percentage === 100 ? true: false}/>
    </div>)
}