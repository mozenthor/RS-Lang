import { IWordListProps } from "../../ETextBook"
import WordItem from "./WordItem"
import styles from "../../Etextbook.module.css";

 
export const WordList: React.FC<IWordListProps> = (props) => {
    return (
        <div className={styles.word_container}>
                {props.data.map(word => <WordItem  data={word} isAuth={props.isAuth}  key={word.id}/>)}
        </div>
    )
}