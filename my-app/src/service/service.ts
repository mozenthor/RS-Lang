import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { getToday, getUserData } from "../util/util";
import { Filters, FiltersFields, IAddWordRequestBody, IAggregatedWords, IAggWord, IStats, IUserWord, IWord } from "../interfaces/interfaces";
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
    })

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

export async function updateStats() {
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
    const stats = await response.data;
    stats.learnedWords = 3;
    console.log(stats);
    await createStats(stats);
}
