import { useEffect, useState } from "react";
import { IAggWord } from "../../../interfaces/interfaces"
import { getWordStatusMessage } from "../../../util/util";
import styles from '../../Etextbook.module.css';
interface IWordStatus {
    isLearned: boolean,
    isHard: boolean,
    word: IAggWord | undefined,
}

export const WordStatus: React.FC<IWordStatus> = (props) => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        setMessage(getWordStatusMessage(props.isHard, props.isLearned, props.word))
    }, [props])
    return (
    <div className={styles.item__message}>
        {message}
    </div>)
}