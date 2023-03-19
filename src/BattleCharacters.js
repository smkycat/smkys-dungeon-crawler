
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
      <div className='portrait_container'>
        <div
          className='image'
          style={{ background: `url(assets/${char.img}) no-repeat center center`, backgroundSize: 'contain' }}
        />
        <div key={char.hp} className={`animation_layer ${char.animation}`} />
        {!char.hp && <div className='x' />}
      </div>
      <div className='battle_character_name'>{char.name}</div>
    </div>
    <AnimatedStatBar value={char.sp} maxValue={char.maxSp} type='sp' />
  </div>
) : (
  <div className='battle_character' />
);
