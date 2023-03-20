
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './stores/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { BattleCharacters } from './BattleCharacters';
import { calculateAttackTarget } from './calculateAttackTarget';
import './Battle.scss';
import { every } from 'lodash';
import { store } from './stores/store';

// character indices
// 0 1 2
// 3 4 5
// 6 7 8
// 9 1011
// const nextTurns = {
//   6: 3,
//   3: 7,
//   7: 4,
//   4: 8,
//   8: 5,
//   5: 9,
//   9: 0,
//   0: 10,
//   10: 1,
//   1: 11,
//   11: 2,
//   2: 6
// };
const nextTurns = {
  '-1': 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  10: 11,
  11: 0,
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6
};

export const Battle = () => {
  const { characters } = useSelector(state => ({
    characters: state.battle.characters
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // exit if no valid characters to act
      if (every(characters.slice(0, 6), i => !i.hp) || every(characters.slice(6), i => i.hp)) {
        return clearTimeout(timeout);
      }

      // find next character to act
      // can't listen to store for activeCharIndex, otherwise <Battle> will rerender during regen phase
      let charIndex = store.getState().battle.activeCharIndex;
      let char = characters[charIndex];
      while (true) {
        charIndex = nextTurns[charIndex];
        char = characters[charIndex];
        if (char.hp) {
          break;
        }
      }

      // calculate target to receive attack
      const targetIndex = calculateAttackTarget(charIndex, char, characters);

      // on the last setTimeout in a battle, targetIndex will be undefined.
      // it's a little jank, but that's what I get for using setTimeout like this.
      if (targetIndex === undefined) {
        return clearTimeout(timeout);
      }

      // update active char index
      dispatch(actions.setActiveCharIndex(charIndex));

      // activate active char's regen
      if (char.regen) {
        dispatch(actions.setActiveCharRegenBuffer({ index: charIndex, value: char.regen }));
      }

      // generate and dispatch attack information, delayed to allow regen to finish animating
      const timeout2 = setTimeout(() => {
        const instruction = {
          hp: [
            { index: charIndex, change: char.regen },
            { index: targetIndex, change: -1 * char.attack }
          ],
          sp: targetIndex >= 6 ? [{ index: targetIndex, change: 1 }] : null,
          animation: [{ index: targetIndex, animation: char.attackType }]
        };
        dispatch(actions.updateBattleStats(instruction));
        clearTimeout(timeout2); // is this line necessary?
      }, 1500);

      return clearTimeout(timeout); // is this line necessary?
    }, 3000);
  }, [characters, dispatch]);

  return (
    <div className='battle'>
      <div className='top_vertical_half'>
        <div className='top_left_section'>
          
        </div>
        <BattleCharacters
          chars={characters.slice(0, 6)}
          baseCharIndex={0}
        />
        <div className='top_right_section'>
          
        </div>
      </div>
      <div className='bottom_vertical_half'>
        <div className='bottom_left_section'>

        </div>
        <BattleCharacters
          chars={characters.slice(6)}
          baseCharIndex={6}
        />
        <div className='bottom_right_section'>
          
        </div>
      </div>
    </div>
  );
};
