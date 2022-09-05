import { IAggWord, IGameResult } from "../interfaces/interfaces";
import { store } from "../SprintGame/appSprintGame";

const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';

export const playAudio = (audioArr: string[])=> {
    const mediaArray = audioArr.map(item => new Audio(SERVER_URL + item));
    mediaArray[0].play();
    mediaArray[0].onended = function() {
        mediaArray[1].play();
    }
    mediaArray[1].onended = function() {
        mediaArray[2].play();
    }
};

export const checkLogin = () => {
    if(localStorage.getItem('token')) return true;
    return false;
}

export const getUserData = () => {
    return {
        name: localStorage.getItem('userName') || '',
        token: localStorage.getItem('token') || '',
        id: localStorage.getItem('userId') || '',
    }
}

export const removeUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
}

export const getToday = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export const getWordStatusMessage = (isHard: boolean, isLearned: boolean, word: IAggWord | undefined) => {
    if( word ) {
    const wordSource = word.userWord.optional.source;
    if(isLearned) {
        if(wordSource === 'Учебник') return `Слово изучено при помощи словаря ${word.userWord.optional.date}`;
        if(wordSource === 'Аудиовызов' || wordSource === 'Спринт') return `Слово изучено при помощи игры "${word.userWord.optional.source}" ${word.userWord.optional.date}`
    }
    if(isHard) {
        if(wordSource === 'Учебник') return `Слово помечено как сложное в словаре ${word.userWord.optional.date}`;
        if(wordSource === 'Аудиовызов' || wordSource === 'Спринт') return `Слово не было угадано в игре "${word.userWord.optional.source}" ${word.userWord.optional.date}`
    }
    }
    return '';
}

export const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sprintResults = () => {
    const sprintRes: IGameResult = {
        correct: [],
        incorrect: [],
        maxtry: 0
      };
    store.gameResult.correct.forEach(el => {
        if(!sprintRes.correct.includes(el) && !sprintRes.incorrect.includes(el)){
            sprintRes.correct.push(el)
    }});
    store.gameResult.incorrect.forEach(el => {
        if(!sprintRes.correct.includes(el) && !sprintRes.incorrect.includes(el)){
            sprintRes.incorrect.push(el)
    }});
    sprintRes.maxtry = store.gameResult.maxtry;
    return sprintRes;
}
