import { useEffect, useState } from "react";
import { IPaginationProps } from "../../interfaces/interfaces";
import styles from '../Etextbook.module.css';

const Pagination: React.FC<IPaginationProps> = ({page, onLeftClick,  onRightClick}) => {
    const [isLeftDisabled, setLeftDisable] = useState(true);
    const [isRightDisabled, setRightDisable] = useState(false);
    useEffect(() => {
        const pageNumber = Number(page);
        if(pageNumber >= 0 && pageNumber <= 28) setRightDisable(false);
        if(pageNumber === 0) setLeftDisable(true);
        if(pageNumber >= 29) setRightDisable(true);
        if(pageNumber > 0) setLeftDisable(false);
    })
    return (
        <div className={styles.pagination__container}>
            <button onClick={() => onLeftClick(Number(page))} className={styles.pagination__button} disabled={isLeftDisabled}>Пред</button>
            <button onClick={() => onRightClick(Number(page)) } className={styles.pagination__button} disabled={isRightDisabled}>След</button>
            <span>Страница № {page ? page : 0}</span>
        </div>
    )
}
export default Pagination;