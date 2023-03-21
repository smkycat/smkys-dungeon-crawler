import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { FlexContainer } from '../particles/FlexContainer';
import { BattleCharacter } from '../battle/BattleCharacters';
import './Main.scss';

const MainPortraits = ({ onPortraitClick }) => {
  const { characters } = useSelector(state => ({
    characters: state.characters.characters
  }), shallowEqual);

  return (
    <FlexContainer
      className='main_portrait_container'
      justifyContent='flex-end'
    >
      {characters.map((i, index) => (
        <BattleCharacter
          key={index}
          char={i}
          onClick={() => onPortraitClick(index)}
        />
      ))}
    </FlexContainer>
  );
};

export const Main = () => {
  const [activeChar, setActiveChar] = useState(0);
  console.log('active char: ', activeChar);

  return (
    <FlexContainer className='main' flexDirection='column'>
      <FlexContainer className='top'>
        <div className='top_left'>
          <div className='crafting_drop'>
            <div className='drop_area' />
            </div>
          <div className='map_drop' />
        </div>
        <div className='preview' />
        <FlexContainer className='top_right' flexDirection='column' >
          <div className='materials' />
          <div className='inventory'>
            {Array(20).fill().map((i, index) => (
              <div key={index} className='draggable_square' />
            ))}
          </div>
        </FlexContainer>
      </FlexContainer>
      <MainPortraits onPortraitClick={(index) => setActiveChar(index)} />
    </FlexContainer>
  );
};
