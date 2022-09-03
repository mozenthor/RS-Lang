import { makeAutoObservable } from "mobx";
import { IWord } from "../../interfaces/interfaces";
import { randomNumber } from "../../util/util";
import { ILevelButtonProps } from "../components/ChoiseLevelButtons";
import { SprintServices } from "../services/SprintServices";

const services = new SprintServices();

export class Store {
  group = '';

  state = 'startScreen';

  question = '';

  answer = '';

  correctAnswer = true;

  userAnswer = true;

  score = 0;

  time!: number;

  animation!: number;

  startTime!: number;

  guessedWords: IWord[] = [];

  notGuessedWords: IWord[] = [];

  currentWord!: IWord;

  ChoiseButtonsPropsArray: ILevelButtonProps[] = [
    {level:'A1', group:'0', color: 'white', activeColor:'lightgreen'},
    {level:'A2', group:'1', color: 'white', activeColor:'lightpink'},
    {level:'B1', group:'2', color: 'white', activeColor:'lightseagreen'},
    {level:'B2', group:'3', color: 'white', activeColor:'lightgoldenrodyellow'},
    {level:'C1', group:'4', color: 'white', activeColor:'lightcyan'},
    {level:'C2', group:'5', color: 'white', activeColor:'lightseagreen'}
  ]

  constructor() {
    makeAutoObservable(this);
  }

  setGroup(group: string) {
    this.group = group;
  }

  unsetActiveChoiseButton(){
    this.ChoiseButtonsPropsArray.forEach((el) => el.color = 'white')
  }

  setActiveChoiseButton(color: string, key: string) {
    this.ChoiseButtonsPropsArray[Number(key)].color = color;
  }

  setState(state: string) {
    this.state = state;
  }

  async randomParaSlov() {
    const randomPage = randomNumber(0, 29).toString();
    const randomWord = randomNumber(0, 19);
    const randomWordTranslate = randomNumber(0,18); 
    const response = await services.getWords(this.group, randomPage);
    this.currentWord = response.splice(randomWord, 1)[0];
    const randomAnswers = [this.currentWord.wordTranslate, response[randomWordTranslate].wordTranslate]
    this.question = this.currentWord.word;
    this.answer = randomAnswers[randomNumber(0, 1)]
    this.correctAnswer = (this.currentWord.wordTranslate === this.answer) ? true : false;
  }

  setUserAnswer(bool: boolean){
    this.userAnswer = bool;
    if (this.userAnswer === this.correctAnswer) {this.score+=10}
  }

  isGuessed(word: IWord) {
    if (this.userAnswer === this.correctAnswer) {
      this.guessedWords.push(word)
    } else {
      this.notGuessedWords.push(word)
    }
  }

  timer = () => {
    const gameDuration = 10;
    const currentTime = new Date().getTime();
    const timing = (currentTime - this.startTime) / 1000;
    this.time = gameDuration - Math.trunc(timing);
    if (this.time > 0) {
      this.animation = requestAnimationFrame(this.timer);
    } else {
      cancelAnimationFrame(this.animation);
      this.setState('stats');
    }
  }

  usetParams() {
    this.question = '';
    this.answer = '';
    this.correctAnswer = true;
    this.userAnswer = true;
    this.score = 0;
    this.guessedWords = [];
    this.notGuessedWords = [];
  }
}