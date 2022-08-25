import { useEffect, useState } from "react"
import { IAggWord, IGameStatProps, IStats, ITodayInfoProps } from "../../interfaces/interfaces";
import { getStats } from "../../service/service";
import { getToday } from "../../util/util";
import { calculateLearnedWordsByDate } from "../util/statsUtil";
import { GameInfo } from "./GameInfo";

const defaultStat = {
    learnedWords: 0,
    optional: {
      date: "01.01.2000",
      audiocall: {
        attempts: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        bestSeries: 0
      },
      sprint: {
        attempts: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        bestSeries: 0
      }
    }
  }

export const TodayInfo: React.FC<ITodayInfoProps> = (props) => {
    const [wordsCount, setWordsCount] = useState(0);
    const games = ['Спринт', 'Аудиовызов']
    useEffect(() => {
        const count = calculateLearnedWordsByDate(props.userWords, getToday());
        setWordsCount(count);
    }, [props.userWords, wordsCount])
    return (
    <div>
        <h2>Статистика за сегодня({getToday()})</h2>
        <h3>Изучено слов {wordsCount}</h3>
        { games.map(item => <GameInfo name = {item} stats = {props.stats} key= {item}/>) }
    </div>)
}