import { fetchAchievements } from '../../apiCalls';
import './AccountWideAchievements.css';


const Controls = () => {
  return (
    <div className="controls">
      AW ACHIEVES CONTROLS
      <button onClick={fetchAchievements}>
        TEST
      </button>
    </div>
  );
}

export default Controls;
