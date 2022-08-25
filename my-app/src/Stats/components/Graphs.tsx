import { useEffect, useState } from "react";
import { IAggWord } from "../../interfaces/interfaces";
import { getUniqueDays,} from "../util/statsUtil";
import { Line } from 'react-chartjs-2';
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
    const [wordsByDay, setWordsByDay] = useState<string[]>([]);
    const [chartData, setChartData] =useState<ChartData<'line'>>(defaultChartData);
    const setGraphData = () => {
        const data = {
            labels: wordsByDay,
            datasets: [
                {
                    label:'количество изученных слов',
                    data:[1,2,3,4],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        }
        setChartData(data);
    } 

    useEffect(() => {
        setWordsByDay(getUniqueDays(props.words));
        console.log(wordsByDay);
        setGraphData();
    }, [props]);
    return(
        <div>
            <Line options={options} data={chartData} width = {500} height = {500}/> 
        </div>
    )
}