import { IAggWord, IStats } from "../../interfaces/interfaces";

export const calculateLearnedWords = (words: IAggWord[]) => {
    return words.length;
}
export const calculateLearnedWordsByDate = (words: IAggWord[], date: string) => {
    // let count = 1;
    // for(const item of words) {
    //     console.log(item.userWord.optional.date);
    //     if(item.userWord.optional.date === date)
    //     count ++;
    // }
    return words.filter(item => item.userWord.optional.date === date).length;
    // return count;
}
export const calculateTotalWinRate = (stats:IStats) => {
    const totalAudiocall = stats.optional.audiocall.wrongAnswers + stats.optional.audiocall.correctAnswers;
    const totalSprint = stats.optional.sprint.wrongAnswers + stats.optional.sprint.correctAnswers;
    const totalCorrect = stats.optional.audiocall.correctAnswers + stats.optional.sprint.correctAnswers;
    return totalCorrect/(totalAudiocall + totalSprint) *100;
}
export const getWordsStatsByDay = (words: IAggWord[]) => {
    const datesArray = Array.from(new Set(words.map(item => item.userWord.optional.date))).sort();
    const wordsByDayArray:[string, number][] = []; 
    for(let i = 0; i < datesArray.length; i++ ) {
        let counter = 0;
        for(let j = 0; j < words.length; j++) {
            if(datesArray[i] === words[j].userWord.optional.date)
            counter +=1;
        }
        wordsByDayArray.push([datesArray[i], counter]);
    }
    return wordsByDayArray;
}
export const getUniqueDays = (words: IAggWord[]) => {
    const datesArray = new Set(words.map(item => item.userWord.optional.date));
    return Array.from(datesArray).sort();
}

export const getAcumByDays = (words: IAggWord[]) => {
    const wordsByDay = getWordsStatsByDay(words);
    for(let i = 1; i<wordsByDay.length; i++) {
        wordsByDay[i][1] += wordsByDay[i-1][1];
    }
    return wordsByDay;
    // console.log(wordsByDay.reduce((acum, next) => {
    //     acum = acum + next[1];
    //     return acum;
    // },0))
}