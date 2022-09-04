import React, { useState, useEffect } from 'react';
import style from './AudioCall.module.css';

import GameRoute from './components/GameRoute';




const AudioCall = (props: {group?: number, page?: number}) => {

  return (
    <div>
     <GameRoute init = {props} />
    </div>
  );
};
export default AudioCall;
