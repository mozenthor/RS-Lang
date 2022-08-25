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
    difficulty: string,
}

export interface IWordListProps {
    data: IWord[],
    isAuth: boolean,
    userWords: IAggWord[],
    setUserWords: Dispatch<SetStateAction<IAggWord[]>>,
}

export interface IWordProps {
    data: IWord,
    isAuth: boolean,
    userWords?: IAggWord[],
    setUserWords: Dispatch<SetStateAction<IAggWord[]>>,
}

export interface ITextBookParams {
    group: string,
    page: string,
}

export interface ITextBookProps {
    children?: React.ReactNode,
}

export interface IDictionaryItemProps {
    data: IAggWord,
    updateArray: (wordId:string) => Promise<void>,
}

export interface IButtonProps {
    page:string,
    onClick: (item: string) => void,
    children?: React.ReactNode
}

export interface INavigationProps {
    groups: string[],
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

export interface IAggregatedWords {
    paginatedResults: IAggWord[],
    totalCount: [
        {
            count: number,
        }
    ]
}

export enum Filters {
    all = '{"$or":[{"userWord.difficulty":"hard"},{"userWord.difficulty":"learned"}]}',
    hard = '{"userWord.difficulty":"hard"}',
    learned = '{"userWord.difficulty":"learned"}',
}
export type FiltersFields = 'all' | 'hard' | 'learned';

export interface IAggWord {
    _id: string,
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
    textExampleTranslate: string,
    userWord: {
        difficulty: string,
        optional: {
            date: string,
            isMarket: boolean
        }
    }
}

export interface IAddWordRequestBody {
    difficulty: string,
    optional: {
        date: string,
        isMarked: boolean,
        source: string
    }
}

export interface IUserData {
    name: string,
    id: string,
    token: string,
}
export interface IUserStatsProps {
    count: number,
    name: string,
}

export interface ITodayInfoProps {
    userWords: IAggWord[],
    stats:IStats,
}
export type GameNames = 'audiocall' | 'sprint';

export enum RusGameNames {
    audiocall = 'Аудивызов',
    sprint = 'Спринт'
}

export interface IGameStatProps {
    name: GameNames;
    stats: IStats,
}

export interface GameStatFields {
    attempts: number,
    correctAnswers: number,
    wrongAnswers: number,
    bestSeries: number,
}
export interface IStats {
    learnedWords: number,
    optional: {
        date: string,
        audiocall: GameStatFields, 
        sprint: GameStatFields,
    }
}

export const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';