import { IWordProps } from "../ETextBook";
import styles from '../Etextbook.module.css';
import { playAudio } from "../../util/playAudio";
const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';
const WordItem: React.FC<IWordProps> = (props) => {
    return (
    <div className={styles.word_item}>
        <img className={styles.item__img} src={SERVER_URL + props.data.image} />
        <h2 className={styles.item__header} >{props.data.word} {props.data.transcription} — {props.data.wordTranslate}</h2>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaning}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaningTranslate}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExample}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExampleTranslate}}></p>
        <button className={styles.item__audio} onClick={() => playAudio([props.data.audio, props.data.audioMeaning, props.data.audioExample])}>Аудио</button>
    </div>
    )
}

export default WordItem;