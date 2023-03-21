import { Battle } from './battle/Battle';
import { Main } from './main/Main';

import './App.scss';
import { shallowEqual, useSelector } from 'react-redux';

export const App = () => {
  const { scene } = useSelector(state => ({
    scene: state.scene.scene
  }), shallowEqual);

  return (
    <div className='app'>
      {scene === 'main' && <Main />}
      {scene === 'battle' && <Battle /> }
    </div>
  );
};
