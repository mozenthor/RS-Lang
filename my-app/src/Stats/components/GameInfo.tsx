import { useEffect } from "react"
import { IGameStatProps } from "../../interfaces/interfaces"

export const GameInfo:React.FC<IGameStatProps> = (props) => {
    useEffect(() => {
        console.log(props.stats);
    }, [props.stats])
    return(<div>
        <h3>{props.name}</h3>
        <div>Количество попыток:{props.stats.optional.audiocall.attempts}</div>
        <div>Количество изученных слов:{props.stats.optional.audiocall.correctAnswers}</div>
        <div>Правильных ответов:{props.stats.optional.audiocall.correctAnswers}</div>
        <div>Лучшая серия:{props.stats.optional.audiocall.bestSeries}</div>
    </div>)
}