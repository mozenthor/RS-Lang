
import { useParams } from 'react-router-dom';
import GameRoute from './components/GameRoute';

const AudioCall = () => {
  const params = useParams<{group: string, page: string}>();
  const queryParams = {page: params.page || '', group: params.group || '' };
    
  return (
    <div>
     <GameRoute init = {queryParams} />
    </div>
  );
};
export default AudioCall;
