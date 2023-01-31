import { fetchAchievements } from '../../apiCalls';
import './AccountAchievements.css';


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
