import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { checkLogin, getToday, getUserData } from "../util/util";
import { Filters, FiltersFields, GameNames, IAddWordRequestBody, IAggregatedWords, IAggWord, IGameResult, IStats, IUserWord, IWord, RusGameNames } from "../interfaces/interfaces";
import { authService } from "../AuthorizationA/services/AuthService";

export async function fetchWords(page: string, group: string, setWords: Dispatch<SetStateAction<IWord[]>>) {
    const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
    setWords(response.data);
}

export async function getWord(id:string) {
    const response = await axios.get<IWord>(`https://final-rslang-backend.herokuapp.com/words/${id}`);
    return response.data
}

export async function fetchUserWords(setUserWords: Dispatch<SetStateAction<IUserWord[]>>) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await axios.request<IUserWord[]>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words`,
        headers: header,
    });
    setUserWords(response.data);
}

export async function fetchAggWords(setUserWords: Dispatch<SetStateAction<IAggWord[]>>, type:FiltersFields, group?: string, page?: string) {
    const data = getUserData();
    let groupFilter = '';
    let filter = Filters[type] as string;
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if(group && page) {
        groupFilter = `group=${group}&page=0&`;
        // filter = `{"$and":[{"$or":[{"userWord.difficulty":"hard", "userWord.difficulty":"learned"}]},{"page":${page}}]}`
        filter = `{"$and":[{"page":${page}, "userWord.optional.isMarked":true}]}`;
    }
    const response = await axios.request<IAggregatedWords[]>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/aggregatedWords?wordsPerPage=500&${groupFilter}filter=${filter}`,
        headers: header,
    });
    setUserWords(response.data[0].paginatedResults);
}

export async function addWord(wordID:string, type: string, source: string) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const body: IAddWordRequestBody = {
        difficulty: type,
        optional: {
            date: getToday(),
            isMarked: true,
            source: source
        }
    };
    await axios({
        method: 'post',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words/${wordID}`,
        data: body,
        headers: header,
    });
}

export async function putWord(wordID:string, type: string, source: string) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const body: IAddWordRequestBody = {
        difficulty: type,
        optional: {
            date: getToday(),
            isMarked: true,
            source: source
        }
    };
    await axios({
        method: 'put',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words/${wordID}`,
        data: body,
        headers: header,
    });
}
export async function deleteWord(wordID:string) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    await axios({
        method: 'delete',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words/${wordID}`,
        headers: header,
    })

}

export async function fetchUserJoinedWords(setUserWords: Dispatch<SetStateAction<IWord[]>>) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await axios.request<IUserWord[]>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words`,
        headers: header,
    });
    const array = response.data;
    const result:IWord[] = [];
    for(let i =0; i< array.length; i++) {
        const item = (await getWord(array[i].wordId));
        result.push(item);
    }
    setUserWords(result);
}

export async function getStats(setGameStats:Dispatch<SetStateAction<IStats>>) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await axios.request<IStats>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/statistics`,
        headers: header,
    });
   setGameStats(response.data);
}
export async function createStats(stats?: IStats) {
    const statData = stats || {
        learnedWords: 0,
        optional: {
          date: getToday(),
          audiocall: {
            attempts: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            bestSeries: 0
          },
          sprint: {
            attempts: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            bestSeries: 0
          }
        }
      }
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    await axios({
        method: 'put',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/statistics`,
        data: statData,
        headers: header,
    })
}

export async function updateWords(correctAnswers: string[], incorrectAnswers: string[], game: GameNames) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await axios.request<IUserWord[]>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words`,
        headers: header,
    });
    let newWordsCount = 0;
    const wordArray = response.data;
    for(let i = 0; i<correctAnswers.length; i++) {
        const index = wordArray.findIndex(item => item.wordId === correctAnswers[i]);
        if(index>-1) {
            if(wordArray[index].difficulty === 'learned') continue;
            if(wordArray[index].difficulty === 'hard') await putWord(correctAnswers[i], 'learned', RusGameNames[game])
        }
        if(index==-1) {
            await addWord(correctAnswers[i], 'learned', RusGameNames[game]);
            newWordsCount += 1;
        }
    }
    for(let i = 0; i<incorrectAnswers.length; i++) {
        const index = wordArray.findIndex(item => item.wordId === incorrectAnswers[i]);
        if(index>-1) {
            if(wordArray[index].difficulty === 'hard') continue;
            if(wordArray[index].difficulty === 'learned') await putWord(incorrectAnswers[i], 'hard', RusGameNames[game])
        }
        if(index==-1) {
            await addWord(incorrectAnswers[i], 'hard', RusGameNames[game]);
            newWordsCount += 1;
        }
    }
    return newWordsCount;
}

export async function checkAuth () {
    try {
        const userId = localStorage.getItem('userId') as string;
        const refreshToken = localStorage.getItem('refreshToken') as string;
        const response = await authService.getNewToken(userId, refreshToken);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      catch(error) {
        throw new Error();
      }
}

export async function updateStats(result: IGameResult, game: GameNames) {
    const data = getUserData();
    if(!checkLogin()) {
        console.log('игра впустую');
        return;
    }
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await axios.request<IStats>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/statistics`,
        headers: header,
    });
    const stats = await response.data;
    delete stats.id;
    if (stats.optional.date == getToday()) {
        stats.optional[game].attempts += 1;
        stats.optional[game].correctAnswers += result.correct.length;
        stats.optional[game].wrongAnswers += result.incorrect.length;
        stats.optional[game].bestSeries = Math.max(stats.optional[game].bestSeries, result.maxtry);
    }
    else {
        stats.optional.date = getToday();
        stats.optional[game].attempts = 1;
        stats.optional[game].correctAnswers = result.correct.length;
        stats.optional[game].wrongAnswers = result.incorrect.length;
        stats.optional[game].bestSeries = result.maxtry;
    }
    const counter = await updateWords(result.correct, result.incorrect, game);
    stats.optional[game].newWords += counter;
    console.log(stats);
    createStats(stats);
}
