import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../particles/FlexContainer';
import { BattleCharacter } from '../battle/BattleCharacters';
import * as actions from '../stores/actions';
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createNewRandomItem } from '../items';
import { testCharacters, testBattleCharacters } from '../characters';
import './Main.scss';
import { testMonsters } from '../monsters';

const DraggableItem = ({ id }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={dragRef}
      className={`draggable_item ${isDragging ? 'is_dragging' : ''}`}
    >
      {id}
    </div>
  );
};
const DraggableItemTarget = () => {
  const [itemId, setItemId] = useState(null);
  const [{ isOver }, dropRef] = useDrop({
    accept: 'item',
    drop: item => setItemId(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={dropRef}
      className={`draggable_item_target ${isOver ? 'is_over' : ''}`}
    >
      <div className='crafting_drop'>
        {itemId}
      </div>
    </div>
  )
};

const MainPortraits = ({ onPortraitClick }) => {
  const { characters } = useSelector(state => ({
    characters: state.character.characters
  }), shallowEqual);

  return (
    <FlexContainer
      className='main_portrait_container'
      justifyContent='flex-end'
    >
      {Object.values(characters).map((i, index) => (
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
  const [activeItem, setActiveItem] = useState(null);

  const { items, inventory } = useSelector(state => ({
    items: state.item.items,
    inventory: state.item.inventory,
  }), shallowEqual);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.addItems([
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
      createNewRandomItem(),
    ]));
    dispatch(actions.setCharacters(testCharacters));
    dispatch(actions.setBattleCharacters([
      ...testMonsters,
      ...testBattleCharacters
    ]));
    dispatch(actions.setScene('battle'));
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <FlexContainer className='main' flexDirection='column'>
        <FlexContainer className='top' justifyContent='space-between'>
          <div className='top_left'>
            <DraggableItemTarget />
            <div className='map_drop'>
              
            </div>
          </div>
          <div className='preview' />
          <FlexContainer className='top_right' flexDirection='column' >
            <div className='materials' />
            <div className='inventory_container'>
              <div className='inventory'>
                {inventory.map((id, index) => (id
                  ? <DraggableItem key={index} id={id} />
                  : <div key={index} className='draggable_item_placeholder' />
                ))}
              </div>
            </div>
          </FlexContainer>
        </FlexContainer>
        <MainPortraits onPortraitClick={(index) => setActiveChar(index)} />
      </FlexContainer>
    </DndProvider>
  );
};
