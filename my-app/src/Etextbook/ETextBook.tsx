/* eslint-disable @typescript-eslint/no-shadow */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkLogin, getUserData } from "../util/playAudio";
import Button from "./Components/Button";
import { Navigation } from "./Components/Navigation";
import Pagination from "./Components/Pagination";
import WordItem from "./Components/WordList/WordItem";
import { WordList } from "./Components/WordList/WordList";
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
export interface IUserWord {
    id: string,
    wordId: string,
}
export interface IWordListProps {
    data: IWord[],
    isAuth: boolean,
    userWords: IUserWord[],
    fetchUserWords: () => Promise<void>,
}
export interface IWordProps {
    data: IWord,
    isAuth: boolean,
    userWords: IUserWord[],
    fetchUserWords: () => Promise<void>,
}
export interface ITextBookParams {
    group: string,
    page: string,
}
interface ITextBookProps {
    children?: React.ReactNode,
}
const ETextBook: React.FC<ITextBookProps> = ({children}) => {
    const [words, setWords] = useState<IWord[]>([]);
    const [userWords, setUserWords] = useState<IUserWord[]>([]);
    const params = useParams<{group: string, page:string }>();
    const history = useNavigate();
    const groups = [0,1,2,3,4,5];
    const [isAuth, setAuth] = useState(false);

    async function fetchWords(page: string, group: string) {
        const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
        setWords(response.data);
    }
    async function fetchUserWords() {
        const data = getUserData();
        const header = {
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const response = await axios.request<IUserWord[]>({
            method: 'get',
            url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words`,
            headers: header,
        });
        setUserWords(response.data);
    }
    
    useEffect(() => {
        console.log(params);
        if(params.group || params.page)
            fetchWords(params.page || '0', params.group || '0');
        else { 
            // fetchWords('0','0');
            // history('/textbook/0/0');
        };
    }, [params]);

    useEffect(() => {
        if(checkLogin()) { 
          setAuth(true);
          fetchUserWords();
    }
        else setAuth(false);
    }, [isAuth, params]);


    const onLeftClick = (page:number) => {
        const newPage = page - 1;
        history(`/textbook/${params.group}/${newPage}`);
    }
    const onRightClick = (page:number) => {
        const newPage = page + 1;
        history(`/textbook/${params.group}/${newPage}`);
    }
    return (
        <div>
            <Navigation groups = {groups} isAuth = {isAuth} />
            {children  ? '' : params.page ? <Pagination 
                onLeftClick = {onLeftClick}
                onRightClick = {onRightClick} 
                page = {params.page?.toString()} /> : ''}
            {children? children :<WordList fetchUserWords = {fetchUserWords} userWords={userWords} data={words} isAuth = {isAuth} />}
            
            
        </div>
    )
}

export default ETextBook;