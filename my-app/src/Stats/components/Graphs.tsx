import { useEffect, useState } from "react";
import { IAggWord } from "../../interfaces/interfaces";
import { getAcumByDays, getUniqueDays, getWordsStatsByDay,} from "../util/statsUtil";
import { Line, Bar } from 'react-chartjs-2';
import { options } from "../util/graphsConfig";
import type { ChartData } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';

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
    const [acumWords, setAcumWords] = useState<[string, number][]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [lineChartData, setLineChartData] =useState<ChartData<'line'>>(defaultChartData);
    const [barChartData, setBarChartData] =useState<ChartData<'bar'>>(defaultChartData);
    const [activeChart, setActiveChart] = useState('');
    const setGraphData = () => {
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
    } 

    useEffect(() => {
        setDays(getUniqueDays(props.words));
        setWordsByDay(getWordsStatsByDay(props.words));
        setAcumWords(getAcumByDays(props.words));
        setGraphData();
        console.log(wordsByDay);
    }, [props, activeChart]);
    return(
        <div>
            <h3>Графики</h3>
            <button onClick={() => setActiveChart('line')}>Количество слов по дням</button><button onClick={() => setActiveChart('bar')}>Увеличение слов по дням</button>
            {activeChart === 'line' ? <Line options={options} data={lineChartData} />  : ''}
            {activeChart === 'bar' ? <Bar options={options} data={barChartData} /> : ''}
        </div>
    )
}