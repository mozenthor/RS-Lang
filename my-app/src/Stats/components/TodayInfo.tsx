import { useEffect, useState } from "react"
import { GameNames, ITodayInfoProps } from "../../interfaces/interfaces";
import { getToday } from "../../util/util";
import { calculateLearnedWordsByDate, calculateTotalWinRate } from "../util/statsUtil";
import { GameInfo } from "./GameInfo";
import styles from '../Stats.module.css';


export const TodayInfo: React.FC<ITodayInfoProps> = (props) => {
    const [wordsCount, setWordsCount] = useState(0);
    const games: GameNames[] = ['sprint', 'audiocall']
    useEffect(() => {
        const count = calculateLearnedWordsByDate(props.userWords, getToday());
        setWordsCount(count);
    }, [props.userWords, wordsCount])
    return (
    <div>
        <div className={styles.today__words}>
          <h2 className={styles.today__words__header} >Статистика за сегодня</h2>
          <h3 className={styles.today__words__header}>Изучено слов: {wordsCount}</h3>
          <h3 className={styles.today__words__header}>Правильных ответов: {calculateTotalWinRate(props.stats).toFixed(2)} %</h3>
        </div>
        <div className={styles.today__games__container} >
        { games.map(item => <GameInfo name = {item} stats = {props.stats} key= {item}/>) }
        </div>
    </div>)
}