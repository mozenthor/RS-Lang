import styles from '../Stats.module.css';

interface IStatsMenuProps {
    changePage: React.Dispatch<React.SetStateAction<string>>,
    page: string
}

export const StatsMenu: React.FC<IStatsMenuProps> = (props) => {
    return (<div className={styles.menu}>
        <button className={props.page === 'today' ? styles.menu__button + ' ' + styles.menu__button_active : styles.menu__button} 
        onClick={() => props.changePage('today')}>Статистика за сегодня</button>
        <button className={props.page === 'total' ? styles.menu__button + ' ' + styles.menu__button_active : styles.menu__button} 
        onClick={() => props.changePage('total')}>Статистика за все время</button>
    </div>)
}