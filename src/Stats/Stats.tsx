import { useEffect, useState } from "react"
import { IAggWord, IStats, IUserData } from "../interfaces/interfaces";
import { checkAuth, fetchAggWords, getStats } from "../service/service";
import { checkLogin, getUserData } from "../util/util";
import { Graphs } from "./components/Graphs";
import { StatsMenu } from "./components/StatsMenu";
import { TodayInfo } from "./components/TodayInfo";
import { UserInfo } from "./components/UserInfo";
import { calculateLearnedWords } from "./util/statsUtil";
import styles from './Stats.module.css'
const defaultStat = {
    learnedWords: 0,
    optional: {
      date: "01.01.2000",
      audiocall: {
        attempts: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        bestSeries: 0, 
        newWords: 0
      },
      sprint: {
        attempts: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        bestSeries: 0,
        newWords: 0
      }
    }
  }
export const Stats: React.FC = () => {
    const [page, setPage] = useState('');
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
          const count = calculateLearnedWords(userWords);
          setLearnedWords(count); 
    }, [userWords, gameStats]);


    return (<div className={styles.container}>
        <StatsMenu page={page} changePage= {setPage} />
        {page === 'today' ? <TodayInfo stats={gameStats}  userWords={userWords}/> : ''}
        {page === 'total' ? <UserInfo count={learnedWords} name={userInfo.name}/> : ''}
        {page === 'total' ? <Graphs words={userWords}/> : ''}
    </div>)
}