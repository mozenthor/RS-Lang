import { useEffect, useState } from "react"
import { deleteWord, fetchUserJoinedWords} from "../../service/service";
import styles from "../../Etextbook.module.css"
import { DictionaryItem } from "./DictionaryItem";
import { IWord } from "../../interfaces/interfaces";

export const Dictionary = () => {
    const [userWords, setUserWords] = useState<IWord[]>([]);

    async function updateArray(wordId:string) {
        const newArray = userWords.filter(item => item.id !== wordId);
        await deleteWord(wordId);
        setUserWords(newArray);
    }

    useEffect(() => {
        fetchUserJoinedWords(setUserWords);
    },[]);

    return (
        <div className={styles.word_container}>
            {userWords.map(word => <DictionaryItem updateArray={updateArray} data={word} key ={word.id} />)}
        </div>
    )

}