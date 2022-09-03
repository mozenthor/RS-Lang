import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { IWord } from "../../interfaces/interfaces";
export async function fetchWords(page: string, group: string, fn: Dispatch<SetStateAction<IWord[]>>) {
    const response = await axios.get(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
    fn(response.data)
    //return {...(await response.data)};
}
export function a () {
    console.log(1)
}