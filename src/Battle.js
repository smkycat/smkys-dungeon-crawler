
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './stores/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { BattleCharacters } from './BattleCharacters';
import './Battle.scss';
import { every, sample } from 'lodash';

// character indices
// 0 1 2
// 3 4 5
// 6 7 8
// 9 1011
const nextTurns = {
  6: 3,
  3: 7,
  7: 4,
  4: 8,
  8: 5,
  5: 9,
  9: 0,
  0: 10,
  10: 1,
  1: 11,
  11: 2,
  2: 6
};

export const Battle = () => {
  const { characters, activeCharIndex } = useSelector(state => ({
    characters: state.battle.characters,
    activeCharIndex: state.battle.activeCharIndex
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // exit if no valid characters to act
      if (every(characters.slice(0, 6), i => !i.hp) || every(characters.slice(6), i => i.hp)) {
        return clearTimeout(timeout);
      }

      // find next character to act
      let charIndex = activeCharIndex;
      let char = characters[charIndex];
      while (true) {
        charIndex = nextTurns[charIndex];
        char = characters[charIndex];
        if (char.hp) {
          break;
        }
      }

      // calculate target to receive attack
      let possibleTargetIndices = [];
      if (char.attackType === 'melee') {
        if (charIndex >= 6) {
          [3, 4, 5].forEach(i => {
            if (characters[i].hp) {
              possibleTargetIndices.push(i);
            }
          });
          if (!possibleTargetIndices.length) {
            [0, 1, 2].forEach(i => {
              if (characters[i].hp) {
                possibleTargetIndices.push(i);
              }
            });
          }
        } else {
          [6, 7, 8].forEach(i => {
            if (characters[i].hp) {
              possibleTargetIndices.push(i);
            }
          });
          if (!possibleTargetIndices.length) {
            [9, 10, 11].forEach(i => {
              if (characters[i].hp) {
                possibleTargetIndices.push(i);
              }
            });
          }
        }
      }
      const targetIndex = sample(possibleTargetIndices);

      // on the last setTimeout in a battle, targetIndex will be undefined.
      // it's a little jank, but that's what I get for using setTimeout like this.
      if (targetIndex === undefined) {
        return clearTimeout(timeout);
      }

      // generate and dispatch attack information
      const instruction = {
        hp: [{ index: targetIndex, change: -1 * char.attack }],
        sp: targetIndex >= 6 ? [{ index: targetIndex, change: 1 }] : null,
        activeCharIndex: charIndex,
      };
      dispatch(actions.updateBattleStats(instruction));
    }, 3000);
  }, [activeCharIndex, characters, dispatch]);

  return (
    <div className='battle'>
      <div className='top_vertical_half'>
        <div className='top_left_section'>
          
        </div>
        <BattleCharacters
          chars={characters.slice(0, 6)}
          activeCharIndex={activeCharIndex}
        />
        <div className='top_right_section'>
          
        </div>
      </div>
      <div className='bottom_vertical_half'>
        <div className='bottom_left_section'>

        </div>
        <BattleCharacters
          chars={characters.slice(6)}
          activeCharIndex={activeCharIndex - 6}
        />
        <div className='bottom_right_section'>
          
        </div>
      </div>
    </div>
  );
};
