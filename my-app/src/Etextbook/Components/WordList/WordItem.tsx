import styles from '../../Etextbook.module.css';
import { getUserData, playAudio } from "../../../util/playAudio";
import { useEffect, useState } from "react";
import { addWord, deleteWord } from "../../service/service";
import axios from "axios";
import { IUserWord, IWordProps } from '../../ETextBook';
const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';
const WordItem: React.FC<IWordProps> = (props) => {
    const [isHard, setHard] = useState(false);
    async function checkWord(wordId:string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        props.userWords.filter((item) => item.wordId === wordId).length === 0 ? setHard(false) : setHard(true);
        // console.log(props.userWords);
        // const data = getUserData();
        // const header = {
        //     'Authorization': `Bearer ${data.token}`,
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // }
        // const response = await axios({
        //     method: 'get',
        //     url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words/${wordId}`,
        //     headers: header,
        // }).then(() => {
        //     console.log('слово есть');
        //     setHard(true);
        // }
        // ).catch(function (error) {
        //     if (error.response) {
        //         console.log('слова нет');
        //         setHard(false);
        //     }
        //   });;
    }
    useEffect(() => {
        checkWord(props.data.id);
    }, );
    const buttonOnClick = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isHard ? await deleteWord(props.data.id) : await addWord(props.data.id);
        setHard(!isHard);
        await props.fetchUserWords();
    }
    return (
    <div className={styles.word_item}>
        <img className={styles.item__img} src={SERVER_URL + props.data.image} />
        <h2 className={styles.item__header} >{props.data.word} {props.data.transcription} — {props.data.wordTranslate}</h2>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaning}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textMeaningTranslate}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExample}}></p>
        <p className={styles.item__text} dangerouslySetInnerHTML={{__html: props.data.textExampleTranslate}}></p>
        <button className={styles.item__audio} onClick={() => playAudio([props.data.audio, props.data.audioMeaning, props.data.audioExample])}>Аудио</button>
        {props.isAuth ? 
        <button className={styles.item__audio} onClick={() => buttonOnClick()}>
        {isHard ? 'Удалить' : 'Добавить'} слово</button> : ''}
    </div>
    )

}

export default WordItem;