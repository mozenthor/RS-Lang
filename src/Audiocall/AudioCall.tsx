import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import GameRoute from './components/GameRoute';

const AudioCall = () => {
  const params = useParams<{ group: string; page: string }>();
  const queryParams = { page: params.page || '', group: params.group || '' };
  const key = useLocation().key;  
 
  const [renderKey, setRenderKey] = useState(key);
  useEffect(() => {    
    setRenderKey(key)
  },[key])

  return (
    <div key={renderKey}>
      <GameRoute init={queryParams} />
    </div>
  );
};
export default AudioCall;
