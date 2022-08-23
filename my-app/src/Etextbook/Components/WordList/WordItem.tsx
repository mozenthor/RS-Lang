import styles from '../../Etextbook.module.css';
import { playAudio } from "../../../util/util";
import { useEffect, useState } from "react";
import { addWord, fetchUserWords } from "../../service/service";
import { IWordProps, SERVER_URL } from '../../interfaces/interfaces';

const WordItem: React.FC<IWordProps> = (props) => {
    const [isHard, setHard] = useState(false);
    const [isLearned, setLearned] = useState(false);

    async function checkWord(wordId:string) {
        if (props.userWords) {
          const wordArray = props.userWords.filter((item) => item.wordId === wordId);
            if (wordArray.length === 0) {
                setHard(false);
                setLearned(false);
            }
            else {
                const type = wordArray[0].difficulty;
                if(type === 'hard') setHard(true);
                if(type === 'learned') setLearned(true); }
        }
    }
    useEffect(() => {
        checkWord(props.data.id);
    }, );
    const buttonOnClick = async () => {
        await addWord(props.data.id, 'hard');
        setHard(!isHard);
        await fetchUserWords(props.setUserWords);
    }
    return (
    <div className={isHard ? styles.word_item + " " + styles.word_item_hard : styles.word_item}>
        <img className={styles.item__img} src={SERVER_URL + props.data.image} />
        <h2 className={styles.item__header} >{props.data.word} {props.data.transcription} — {props.data.wordTranslate}</h2>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaning}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaningTranslate}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExample}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExampleTranslate}}></p>
        <button className={styles.item__button} onClick={() => playAudio([props.data.audio, props.data.audioMeaning, props.data.audioExample])}>Аудио</button>
        {props.isAuth ? 
        <button disabled = {isHard} className={styles.item__button} onClick={() => buttonOnClick()}>
        Добавить в "сложные"</button> : ''}
    </div>
    )

}

export default WordItem;