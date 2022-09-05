import { makeAutoObservable } from "mobx";
import { IGameResult, IWord } from "../../interfaces/interfaces";
import { updateStats } from "../../service/service";
import { randomNumber, sprintResults } from "../../util/util";
import { ILevelButtonProps } from "../components/ChoiseLevelButtons";
import { SprintServices } from "../services/SprintServices";

const services = new SprintServices();

export class Store {
  group = '';

  page = '';

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

  currentSeries = 0;

  bestSeries = 0;

  gameResult: IGameResult = {
    correct: [],
    incorrect: [],
    maxtry: 0
  };
  
  disabledButton = false;

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

  setPage(){
    this.page = randomNumber(0, 29).toString();
  }

  async generateQuestion() {
    const randomWord = randomNumber(0, 19);
    const randomWordTranslate = randomNumber(0,18);
    const response = localStorage.getItem('token')
      ? await services.getWords(this.group, this.page)
      : await services.getWords(this.group, this.page);
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
      this.guessedWords.push(word);
      this.gameResult.correct.push(word.id)
      this.currentSeries += 1;
    } else {
      this.notGuessedWords.push(word);
      this.gameResult.incorrect.push(word.id)
      this.currentSeries = 0;
    }
  }

  timer = () => {
    const gameDuration = 30;
    const currentTime = new Date().getTime();
    const timing = (currentTime - this.startTime) / 1000;
    this.time = gameDuration - Math.trunc(timing);
    if (this.time > 0) {
      this.animation = requestAnimationFrame(this.timer);
    } else {
      cancelAnimationFrame(this.animation);
      this.setState('stats');
      this.setBestSeries();
      updateStats(sprintResults(), 'sprint');
      document.removeEventListener('keypress', this.handleKey);
    }
  }

  unsetParams() {
    this.group = '';
    this.page = '';
    cancelAnimationFrame(this.animation);
    document.removeEventListener('keypress', this.handleKey);
    this.state = 'startScreen';
    this.question = '';
    this.answer = '';
    this.correctAnswer = true;
    this.userAnswer = true;
    this.score = 0;
    this.guessedWords = [];
    this.notGuessedWords = [];
    this.currentSeries = 0;
    this.gameResult.correct = [];
    this.gameResult.incorrect = [];
  }

  setBestSeries() {
    if(this.bestSeries < this.currentSeries) {
      this.bestSeries = this.currentSeries;
      this.gameResult.maxtry = this.bestSeries;
    };
  }

  async chekAnswer(bool: boolean) {
    this.disabledButton = true;
    await this.generateQuestion();
    this.setUserAnswer(bool);
    this.isGuessed(this.currentWord);
    this.disabledButton = false;
  }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   handleKey = async (event: any) => {
    if (this.state === 'mainGame') {
      if (event.key === '1') {
        this.chekAnswer(false)
      } else if (event.key === '2') {
        this.chekAnswer(true)
      }
    }
    event.preventDefault();
  };
}