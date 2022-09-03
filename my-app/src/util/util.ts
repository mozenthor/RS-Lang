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

export const getToday = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}