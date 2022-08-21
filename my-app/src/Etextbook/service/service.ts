import axios from "axios";
import { getUserData } from "../../util/playAudio";
import { IWord } from "../ETextBook";

export async function fetchWords(page: string, group: string) {
    const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
    return response.data;
}

export async function addWord(wordID:string) {
    const data = getUserData();
    const header = {
        'Authorization': `Bearer ${data.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    await axios({
        method: 'post',
        url: `https://final-rslang-backend.herokuapp.com/users/${data.id}/words/${wordID}`,
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