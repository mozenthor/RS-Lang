import { Link } from "react-router-dom"
import styles from '../Page.module.css';
export const Logo: React.FC = () => {
    return (
        <Link to={'/'} >
            <div className={styles.logo}>
                RS Lang
            </div>
        </Link>
    )
}