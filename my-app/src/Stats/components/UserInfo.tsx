import ProgressBar from 'react-bootstrap/ProgressBar';
import { IUserStatsProps } from '../../interfaces/interfaces';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Stats.module.css';

export const UserInfo: React.FC<IUserStatsProps> = (props) => {

    return (<div className={styles.user_info}>
        <h2 className={styles.user_header}>Статистика пользователя {props.name}</h2>
        <h3 className={styles.user_subheader}>Всего изучено слов: {props.count}</h3>
        <ProgressBar now={(props.count*100)/3600} />
        <h4 className={styles.user_subheader}>Прогресс: {((props.count*100)/3600).toFixed(2)} %</h4>
    </div>)
}