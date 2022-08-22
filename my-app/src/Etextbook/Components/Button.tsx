import styles from '../Etextbook.module.css';
import { IButtonProps } from '../interfaces/interfaces';


const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button className={styles.group__button} onClick={() => { 
            props.onClick(props.page);
            console.log(this);
            }}>
            {props.children || props.page}
        </button>
        
    )
}
export default Button;