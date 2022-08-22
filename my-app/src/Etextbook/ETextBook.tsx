/* eslint-disable @typescript-eslint/no-shadow */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Components/Button";
import Pagination from "./Components/Pagination";
import WordItem from "./Components/WordItem";
import styles from './Etextbook.module.css';

export interface IWord {
    id: string,
    group: number,
    page: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string
}
export interface IWordProps {
    data: IWord,
}
export interface ITextBookParams {
    group: string,
    page: string,
}
const ETextBook: React.FC = () => {
    const [words, setWords] = useState<IWord[]>([]);
    const params = useParams<{group: string, page:string }>();
    const history = useNavigate();
    const groups = [0,1,2,3,4,5];

    async function fetchWords(page: string, group: string) {
        const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
        setWords(response.data);
    }
    
    useEffect(() => {
        console.log('сработали');
        if(params.group && params.page)
            fetchWords(params.page, params.group);
        else { 
        fetchWords('0','0');
        history('/textbook/0/0');
    }
    }, [params]);

    const onLeftClick = (page:number) => {
        const newPage = page - 1;
        history(`/textbook/${params.group}/${newPage}`);
    }
    const onRightClick = (page:number) => {
        console.log(history);
        const newPage = page + 1;
        console.log(page);
        history(`/textbook/${params.group}/${newPage}`);
    }
    return (
        <div>
            <div className={styles.group__container}>
                {groups.map(item => <Button onClick = {(item) => history(`/textbook/${item}/0`, {replace: true})} key={item} page={item} />)}
            </div>
                <Pagination 
                onLeftClick = {onLeftClick}
                onRightClick = {onRightClick} 
                page = {params.page?.toString()} />
            <div className={styles.word_container}>
                {words.map(word => <WordItem  data={word}  key={word.id}/>)}
            </div>
            
        </div>
    )
}

export default ETextBook;