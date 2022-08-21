import styles from '../Etextbook.module.css';

interface IButton {
    page:number,
    onClick: (item: number) => void
}

const Button: React.FC<IButton> = ({page, onClick}) => {
    return (
        <button className={styles.group__button} onClick={() => { 
            onClick(page);
            console.log(this);
            }}>
            {page}
        </button>
        
    )
}
export default Button;