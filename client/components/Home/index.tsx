import { useAppSelector } from '../../store/hooks';


const Home = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div className="home">
      {!expansion && !tool ? <div>Please select an expansion</div> : <></>}
      {expansion && !tool ? <div>Please select a tool</div> : <></>}
    </div>
  );
}

export default Home;
