import { Audiocall } from "./Audiocall"
import { Sprint } from "./Sprint"
import styles from './Games.module.css'
import { GamesItem } from "./GamesItem"

export interface IGamesItemProps {
    name: string, 
    link: string,
    isActive: boolean,
}
export interface IGamesProps {
    percentage: number
}
export const Games: React.FC<IGamesProps> = (props) => {
    return (
    <div className={styles.tile__container}>
        <GamesItem name='Аудивызов' link ='/' isActive ={props.percentage === 100 ? true: false }/>
        <GamesItem name='Спринт' link ='/' isActive ={props.percentage === 100 ? true: false}/>
    </div>)
}