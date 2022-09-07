import { ProgressBar } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import styles from '../Etextbook.module.css';

interface IProgress {
    progress: number,
}

export const ProgressInfo: React.FC<IProgress> = (props) => {
    const setVariant = (progress: number) => {
        if (progress <= 30) return 'danger';
        if (progress > 30 && progress <= 60) return 'warning';
        if (progress > 60 && progress < 100) return 'info';
        return 'success';
    }
    return (<div>
        <div className={styles.textbook__progress}>Страница изучена на {props.progress <= 100 ? props.progress : 0}%</div>
        <ProgressBar striped now={props.progress <= 100 ? props.progress : 0} variant={setVariant(props.progress)}/>
    </div>)
}