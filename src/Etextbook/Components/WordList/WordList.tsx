import WordItem from "./WordItem"
import styles from "../../Etextbook.module.css";
import { IWordListProps } from "../../../interfaces/interfaces";

 
export const WordList: React.FC<IWordListProps> = (props) => {
    return (
        <div className={styles.word_container}>
                {props.data.map(word => <WordItem setUserWords={props.setUserWords} userWords={props.userWords} data={word} isAuth={props.isAuth}  key={word.id}/>)}
        </div>
    )
}