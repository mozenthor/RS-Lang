import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { getUserData } from "../../util/util";
import { Filters, FiltersFields, IAggregatedWords, IAggWord, IUserWord, IWord } from "../interfaces/interfaces";

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

export async function fetchAggWords(setUserWords: Dispatch<SetStateAction<IAggWord[]>>, type:FiltersFields) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await axios.request<IAggregatedWords[]>({
        method: 'get',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/aggregatedWords?wordsPerPage=500&filter=${Filters[type]}`,
        headers: header,
    });
    console.log(response.data)
    setUserWords(response.data[0].paginatedResults);
}

export async function addWord(wordID:string, type: string) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const body = {
        difficulty: type,
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