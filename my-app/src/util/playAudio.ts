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