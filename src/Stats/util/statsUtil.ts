import { IAggWord, IStats } from "../../interfaces/interfaces";

export const calculateLearnedWords = (words: IAggWord[]) => {
    return words.length;
}
export const calculateLearnedWordsByDate = (words: IAggWord[], date: string) => {
    return words.filter(item => item.userWord.optional.date === date).length;
}

export const sortDate = function(a:string,b: string) {
    a = a.split('.').reverse().join('');
    b = b.split('.').reverse().join('');
    return a > b ? 1 : a < b ? -1 : 0;
  }

export const calculateTotalWinRate = (stats:IStats) => {
    const totalAudiocall = stats.optional.audiocall.wrongAnswers + stats.optional.audiocall.correctAnswers;
    const totalSprint = stats.optional.sprint.wrongAnswers + stats.optional.sprint.correctAnswers;
    const totalCorrect = stats.optional.audiocall.correctAnswers + stats.optional.sprint.correctAnswers;
    return totalCorrect/(totalAudiocall + totalSprint) *100 || 0;
}
export const getWordsStatsByDay = (words: IAggWord[]) => {
    const datesArray = Array.from(new Set(words.map(item => item.userWord.optional.date))).sort(sortDate);
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
    return Array.from(datesArray).sort(sortDate);
}

export const getAcumByDays = (words: IAggWord[]) => {
    const wordsByDay = getWordsStatsByDay(words);
    for(let i = 1; i<wordsByDay.length; i++) {
        wordsByDay[i][1] += wordsByDay[i-1][1];
    }
    return wordsByDay;

}
export const getWordsByDay = (words: IAggWord[], date: string) => {
    return words.filter(item => item.userWord.optional.date === date);
}
export const getWordsBySource = (words: IAggWord[], source: string, date?: string) => {
    const wordsArray = date ? getWordsByDay(words, date) : words;
    let counter = 0;
    for(let i = 0; i < wordsArray.length; i++) {
        if(wordsArray[i].userWord.optional.source === source) {
            counter++;
        }
    }
    return counter;
}
export const getCountsBySorce = (words: IAggWord[]) => {
    const sourceCount: [string, number][] = [['Учебник', 0], ['Аудиовызов', 0], ['Спринт', 0]];
    for(let i = 0; i< sourceCount.length; i++ ) {
        for(let j=0; j<words.length; j++) {
            if(sourceCount[i][0] === words[j].userWord.optional.source)
                sourceCount[i][1] += 1;
        }
    }
    return sourceCount;
}

