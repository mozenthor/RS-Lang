import { IAggWord } from "../../interfaces/interfaces";

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