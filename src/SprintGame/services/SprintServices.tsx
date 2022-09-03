import axios from "axios";
import { IWord } from "../../interfaces/interfaces";

export class SprintServices {
  async getWords(group:string, page:string): Promise<IWord[]>{
    const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
    return response.data;
  }
}