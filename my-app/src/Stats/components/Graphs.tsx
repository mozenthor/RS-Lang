import { useEffect, useState } from "react";
import { IAggWord } from "../../interfaces/interfaces";
import { getAcumByDays, getCountsBySorce, getUniqueDays, getWordsStatsByDay,} from "../util/statsUtil";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { options } from "../util/graphsConfig";
import type { ChartData } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import styles from '../Stats.module.css';
interface IGraphProps {
    words: IAggWord[],
}
const defaultChartData = {
    labels: ['1'],
    datasets: [
        {
            label:'количество изученных слов',
            data:[1],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ]
}
export const Graphs: React.FC<IGraphProps> = (props) => {
    ChartJS.register(...registerables);
    const [wordsByDay, setWordsByDay] = useState<[string, number][]>([]);
    const [wordsBySorce, setWordsBySource] = useState<[string, number][]>([]);
    const [acumWords, setAcumWords] = useState<[string, number][]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [lineChartData, setLineChartData] =useState<ChartData<'line'>>(defaultChartData);
    const [barChartData, setBarChartData] =useState<ChartData<'bar'>>(defaultChartData);
    const [pieChartData, setPieChartData] =useState<ChartData<'pie'>>(defaultChartData);
    const [activeChart, setActiveChart] = useState('');
    const setGraphData = () => {
        const pieData = {
            labels: wordsBySorce.map(item => item[0]),
            datasets: [
                {
                  label: '# of Votes',
                  data: wordsBySorce.map(item => item[1]),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
        }
        const barData = {
            labels: days,
            datasets: [
                {
                    label:'Общее количество слов',
                    data: acumWords.map(item => item[1]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }
        const lineData = {
            labels: days,
            datasets: [
                {
                    label:'количество изученных слов',
                    data: wordsByDay.map(item => item[1]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }
        setLineChartData(lineData);
        setBarChartData(barData);
        setPieChartData(pieData);
    } 

    useEffect(() => {
        setDays(getUniqueDays(props.words));
        setWordsByDay(getWordsStatsByDay(props.words));
        setAcumWords(getAcumByDays(props.words));
        setWordsBySource(getCountsBySorce(props.words));
        setGraphData();
    }, [props, activeChart]);
    return(
        <div>
            <h3 className={styles.graphs__header}>Графики</h3>
            <div className={styles.graphs__menu}>
                <button 
                className={activeChart ==='line' ? styles.graphs__button + ' ' + styles.graphs__button_active : styles.graphs__button} 
                onClick={() => setActiveChart('line')}>Количество слов по дням</button>
                <button 
                className={activeChart ==='pie' ? styles.graphs__button + ' ' + styles.graphs__button_active : styles.graphs__button} 
                onClick={() => setActiveChart('pie')}>Статистика по способам изучения</button>
                <button 
                className={activeChart ==='bar' ? styles.graphs__button + ' ' + styles.graphs__button_active : styles.graphs__button}  
                onClick={() => setActiveChart('bar')}>Увеличение слов по дням</button>
            </div>
            <div className={styles.graphs__container}>
                {activeChart === 'line' ? <Line options={options} data={lineChartData} />  : ''}
                {activeChart === 'bar' ? <Bar options={options} data={barChartData} /> : ''}
                {activeChart === 'pie' ? <Pie data={pieChartData} options={{ maintainAspectRatio: false }} width= {692} height = {692}/> : ''}
            </div>
        </div>
    )
}