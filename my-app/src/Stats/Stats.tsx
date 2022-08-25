import { useEffect, useState } from "react"
import { IAggWord, IStats, IUserData } from "../interfaces/interfaces";
import { fetchAggWords, getStats } from "../service/service";
import { getUserData } from "../util/util";
import { TodayInfo } from "./components/TodayInfo";
import { UserInfo } from "./components/UserInfo";
import { calculateLearnedWords } from "./util/statsUtil";
const defaultStat = {
    learnedWords: 0,
    optional: {
      date: "01.01.2000",
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
export const Stats: React.FC = () => {

    const [userWords, setUserWords] = useState<IAggWord[]>([]);
    const [learnedWords, setLearnedWords] = useState(0);
    const [gameStats, setGameStats] = useState<IStats>(defaultStat);
    const [userInfo, setUserInfo] = useState<IUserData>({
        name: '',
        id: '',
        token: ''
    });

    async function setData() {
        await getStats(setGameStats);
        await fetchAggWords(setUserWords, 'learned');
        setUserInfo(getUserData());  
    }

    useEffect(() => {
        setData();
        
    },[]);

    useEffect(() => {
        console.log(userWords);
        const count = calculateLearnedWords(userWords);
        setLearnedWords(count);
    }, [userWords, gameStats]);


    return (<div>
        <UserInfo count={learnedWords} name={userInfo.name}/>
        <TodayInfo stats={gameStats}  userWords={userWords}/>
    </div>)
}