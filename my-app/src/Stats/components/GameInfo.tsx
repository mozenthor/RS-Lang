import { useEffect, useState } from "react"
import { IGameStatProps, RusGameNames } from "../../interfaces/interfaces"

export const GameInfo:React.FC<IGameStatProps> = (props) => {
    const [winRate, setWinRate] = useState(0);
    useEffect(() => {
        const rate = props.stats.optional[props.name].correctAnswers / (props.stats.optional[props.name].correctAnswers + props.stats.optional[props.name].wrongAnswers);
        setWinRate(rate*100);
        console.log(props.stats);
    }, [props.stats])
    return(<div>
        <h3>{RusGameNames[props.name]}</h3>
        <div>Количество попыток: {props.stats.optional[props.name].attempts}</div>
        <div>Количество изученных слов: {props.stats.optional[props.name].correctAnswers}</div>
        <div>Правильных ответов: {winRate.toFixed(2) || 0}%</div>
        <div>Лучшая серия: {props.stats.optional[props.name].bestSeries}</div>
    </div>)
}