import React from 'react';
import style from '../AudioCall.module.css';
import { Twords } from '../../types';
const Description = (props: {words: Twords}) => {
    const { words }  = props;
    return (
        <div className={style.description}>
            <div className={style.description__text}>{words.word}</div>
            <div className={style.description__text}>{words.transcription}</div>
        </div>
    )
}

export default Description;