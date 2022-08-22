/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkLogin, } from "../util/util";
import { Navigation } from "./Components/Navigation";
import Pagination from "./Components/Pagination";
import { WordList } from "./Components/WordList/WordList";
import { ITextBookProps, IUserWord, IWord } from "./interfaces/interfaces";
import { fetchUserWords, fetchWords } from "./service/service";


const ETextBook: React.FC<ITextBookProps> = ({children}) => {
    const [words, setWords] = useState<IWord[]>([]);
    const [userWords, setUserWords] = useState<IUserWord[]>([]);
    const params = useParams<{group: string, page:string }>();
    const history = useNavigate();
    const groups = [0,1,2,3,4,5];
    const [isAuth, setAuth] = useState(false);

    
    useEffect(() => {
        console.log(params);
        if(params.group || params.page)
            fetchWords(params.page || '0', params.group || '0', setWords);
        else { 
            // fetchWords('0','0');
            // history('/textbook/0/0');
        };
    }, [params]);

    useEffect(() => {
        if(checkLogin()) { 
          setAuth(true);
          fetchUserWords(setUserWords);
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
            {children? children :<WordList setUserWords = {setUserWords} userWords={userWords} data={words} isAuth = {isAuth} />}          
        </div>
    )
}

export default ETextBook;