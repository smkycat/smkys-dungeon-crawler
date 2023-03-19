
import { AnimatedStatBar } from './AnimatedStatBar';
import './BattleCharacters.scss';
import { Image } from './particles/Image';

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
        <Image src={char.img} width={120} height={120} />
        <Image
          key={char.hp}
          className={`animation_layer ${char.animation}`}
          width={120}
          height={120}
          src={`${char.animation}_animation.png`}
        />
        {!char.hp && <Image src='x.png' className='x' width={120} height={120} />}
      </div>
      <div className='battle_character_name'>{char.name}</div>
    </div>
    <AnimatedStatBar value={char.sp} maxValue={char.maxSp} type='sp' />
  </div>
) : (
  <div className='battle_character' />
);
