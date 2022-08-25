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
    const datesArray = new Set(words.map(item => item.userWord.optional.date));
    console.log();
}
export const getUniqueDays = (words: IAggWord[]) => {
    const datesArray = new Set(words.map(item => item.userWord.optional.date));
    return Array.from(datesArray).sort();
}