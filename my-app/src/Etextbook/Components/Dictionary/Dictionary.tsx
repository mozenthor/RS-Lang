import { useEffect, useState } from "react"
import { deleteWord, fetchAggWords, fetchUserJoinedWords} from "../../service/service";
import styles from "../../Etextbook.module.css"
import { DictionaryItem } from "./DictionaryItem";
import { IAggWord, IWord } from "../../interfaces/interfaces";

const HARD_WORDS = '';

export const Dictionary = () => {
    const [userWords, setUserWords] = useState<IAggWord[]>([]);

    async function updateArray(wordId:string) {
        const newArray = userWords.filter(item => item._id !== wordId);
        await deleteWord(wordId);
        setUserWords(newArray);
    }

    useEffect(() => {
        fetchAggWords(setUserWords, 'hard');
    },[]);

    return (
        <div className={styles.word_container}>
            {userWords.map(word => <DictionaryItem updateArray={updateArray} data={word} key ={word._id} />)}
        </div>
    )

}