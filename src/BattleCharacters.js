
import { AnimatedStatBar } from './AnimatedStatBar';
import './BattleCharacters.scss';

export const BattleCharacters = ({ chars, activeCharIndex }) => (
  <div className='battle_characters'>
    {chars.map((char, index) => (
      <BattleCharacter key={index} char={char} isActive={index === activeCharIndex} />
    ))}
  </div>
);

const BattleCharacter = ({ char, isActive }) => char.img ? (
  <div className={`battle_character ${isActive ? 'active' : ''}`}>
    <AnimatedStatBar value={char.hp} maxValue={char.maxHp} type='hp' />
    <div className='battle_character_portrait_and_name'>
      <img alt='portrait' src={`assets/${char.img}`} />
      <div className='battle_character_name'>{char.name}</div>
    </div>
    <AnimatedStatBar value={char.sp} maxValue={char.maxSp} type='sp' />
  </div>
) : (
  <div className='battle_character' />
);
