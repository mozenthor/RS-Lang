import { playAudio } from "../../../util/util";
import styles from "../../Etextbook.module.css"
import { IDictionaryItemProps, SERVER_URL } from "../../../interfaces/interfaces";

export const DictionaryItem: React.FC<IDictionaryItemProps> = (props) => {
    return (
        <div className={styles.word_item}>
            <img className={styles.item__img} src={SERVER_URL + props.data.image} />
            <h2 className={styles.item__header} >{props.data.word} {props.data.transcription} — {props.data.wordTranslate}</h2>
            <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaning}}></p>
            <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaningTranslate}}></p>
            <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExample}}></p>
            <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExampleTranslate}}></p>
            <button className={styles.item__button} onClick={() => playAudio([props.data.audio, props.data.audioMeaning, props.data.audioExample])}>Аудио</button>
            <button className={styles.item__button} onClick={() => props.updateArray(props.data._id)}> Удалить слово</button>
        </div>
    )
}