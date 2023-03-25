import { shallowEqual, useSelector } from 'react-redux';
import { AnimatedStatBar } from './AnimatedStatBar';
import './BattleCharacters.scss';
import { Image } from '../particles/Image';

export const BattleCharacters = ({ chars, baseCharIndex }) => {
  const { activeCharIndex, activeCharRegenBuffer } = useSelector(state => ({
    activeCharIndex: state.battle.activeCharIndex,
    activeCharRegenBuffer: state.battle.activeCharRegenBuffer
  }), shallowEqual);

  return (
    <div className='battle_characters'>
      {chars.map((char, index) => (
        <BattleCharacter
          key={baseCharIndex + index}
          char={(baseCharIndex + index) === activeCharRegenBuffer.index
            ? {
              ...char,
              derivedStats: {
                ...char.derivedStats,
                HP: Math.min(char.derivedStats.maxHP, char.derivedStats.HP + activeCharRegenBuffer.value)
              }
            }
            : char
          }
          isActive={(baseCharIndex + index) === activeCharIndex}
        />
      ))}
    </div>
  );
};

export const BattleCharacter = ({ char, isActive, onClick = null }) => (char && char.image) ? (
  <div className={`battle_character ${isActive ? 'active' : ''}`} onClick={onClick}>
    <AnimatedStatBar value={char.derivedStats.HP} maxValue={char.derivedStats.maxHP} type='hp' />
    <div className='battle_character_portrait_and_name'>
      <div className='portrait_container'>
        <Image src={char.image} width={120} height={120} />
        {char.animation && (
          <Image
            key={char.animation}
            className={`animation_layer ${char.animation}`}
            width={120}
            height={120}
            src={`${char.animation}_animation.png`}
          />
        )}
        {!char.derivedStats.HP && <Image src='x.png' className='x' width={120} height={120} />}
      </div>
      <div className='battle_character_name'>{char.name}</div>
    </div>
    <AnimatedStatBar value={char.derivedStats.SP} maxValue={char.derivedStats.maxSP} type='sp' />
  </div>
) : (
  <div className='battle_character' />
);
