import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../Etextbook.module.css';
import { IButtonProps } from '../../interfaces/interfaces';


const Button: React.FC<IButtonProps> = (props) => {

    const params = useParams<{group: string, page:string }>();
    const location = useLocation();
    const [isActive, setActive] = useState(false);
    const currentPage = location.pathname.split('/')[2];


    useEffect(() => {
        if(currentPage == props.page) setActive(true);
        else setActive(false);
    },[params]);

    return (
        <button className={isActive ? styles.group__button_active + ' ' + styles.group__button : styles.group__button} onClick={() => { 
            props.onClick(props.page);
            }}>
            {props.children || props.text}
        </button>
        
    )
}
export default Button;