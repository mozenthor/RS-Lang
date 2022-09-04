import axios from "axios";
import { IWord } from "../../interfaces/interfaces";

export class SprintServices {
  async getWords(group:string, page:string): Promise<IWord[]> {
    const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
    return response.data;
  }

  async getUserWords(group:string, page:string): Promise<IWord[]> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await axios.request<IWord[]>({
      method: 'get',
      url: `https://final-rslang-backend.herokuapp.com/users/${userId}/aggregatedWords?page=${page}&group=${group}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  }

  async getWord(id:string) {
    const response = await axios.get<IWord>(`https://final-rslang-backend.herokuapp.com/words/${id}`);
    return response.data
}
}