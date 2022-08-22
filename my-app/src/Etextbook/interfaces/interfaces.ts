import { Dispatch, SetStateAction } from "react";

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
    setUserWords: Dispatch<SetStateAction<IUserWord[]>>,
}
export interface IWordProps {
    data: IWord,
    isAuth: boolean,
    userWords?: IUserWord[],
    setUserWords: Dispatch<SetStateAction<IUserWord[]>>,
}
export interface ITextBookParams {
    group: string,
    page: string,
}
export interface ITextBookProps {
    children?: React.ReactNode,
}

export interface IDictionaryItemProps {
    data: IWord,
    updateArray: (wordId:string) => Promise<void>,
}

export interface IButtonProps {
    page:number,
    onClick: (item: number) => void,
    children?: React.ReactNode
}
export interface INavigationProps {
    groups: number[],
    isAuth: boolean,
}
export interface IPaginationProps {
    page: string | undefined,
    onLeftClick: (page:number) => void,
    onRightClick: (page:number) => void,
}
export interface IDictionaryProps {
    groups: number[],
}
export const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';