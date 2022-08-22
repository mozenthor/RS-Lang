import { useNavigate } from 'react-router-dom';
import styles from '../Etextbook.module.css';
import { INavigationProps } from '../interfaces/interfaces';
import Button from './Button';


export const Navigation: React.FC<INavigationProps> = (props) => {
    const history = useNavigate();
    return (
        <div className={styles.group__container}>
                {props.groups.map(item => <Button onClick = {(btn) => history(`/textbook/${btn}/0`, {replace: true})} key={item} page={item} />)}
                {props.isAuth ? <Button onClick = {() => history(`/textbook/dictionary`)} key={'6'} page={6} >Сложные слова</Button> : ''}
        </div>
        
    )
}