import { useEffect, useState } from "react"
import { GameNames, ITodayInfoProps, RusGameNames } from "../../interfaces/interfaces";
import { getToday } from "../../util/util";
import { calculateLearnedWordsByDate, calculateTotalWinRate, getWordsBySource } from "../util/statsUtil";
import { GameInfo } from "./GameInfo";
import styles from '../Stats.module.css';


export const TodayInfo: React.FC<ITodayInfoProps> = (props) => {
    const [wordsCount, setWordsCount] = useState(0);
    const [textbookWordsCount, setTextbookWordsCount] = useState(0);
    const [audiocallWordsCount, setAudiocallWordsCount] = useState(0);
    const [sprintWordsCount, setSprintWordsCount] = useState(0);
    const games: GameNames[] = ['sprint', 'audiocall']
    useEffect(() => {
        const count = calculateLearnedWordsByDate(props.userWords, getToday());
        const textbookCount = getWordsBySource(props.userWords, 'Учебник', getToday());
        const audiocallCount = getWordsBySource(props.userWords, 'Аудиовызов', getToday());
        const sprintCount = getWordsBySource(props.userWords, 'Спринт', getToday());
        setTextbookWordsCount(textbookCount);
        setAudiocallWordsCount(audiocallCount);
        setSprintWordsCount(sprintCount);
        setWordsCount(count);
    }, [props.userWords, wordsCount])
    return (
    <div>
        <div className={styles.today__words}>
          <h2 className={styles.today__words__header} >Статистика за сегодня</h2>
          <h3 className={styles.today__words__header}>Изучено слов: {wordsCount}</h3>
          <h3 className={styles.today__words__header}>При помощи учебника: {textbookWordsCount}</h3>
          <h3 className={styles.today__words__header}>Правильных ответов: {calculateTotalWinRate(props.stats).toFixed(2)} %</h3>
        </div>
        <div className={styles.today__games__container} >
        { games.map(item => <GameInfo count = {1} name = {item} stats = {props.stats} key= {item}/>) }
        </div>
    </div>)
}