import { useRef } from 'react';
import './AnimatedStatBar.scss';

export const AnimatedStatBar = ({ value, maxValue, type }) => {
  const lastValueRef = useRef(maxValue);
  const isValueIncreasing = lastValueRef.current < value;
  lastValueRef.current = value;

  const totalNumPartitions = Math.floor(maxValue / 10);
  const numPartitionsToShow = Math.floor(maxValue / 10);

  return (
    <div className={`animated_stat_bar ${type}`}>
      <div
        className={`background ${isValueIncreasing ? 'fast' : 'slow'}`}
        style={{ height: `${140 * value / maxValue}px` }}
      />      
      <div
        className={`foreground ${isValueIncreasing ? 'slow' : 'fast'}`}
        style={{ height: `${140 * value / maxValue}px` }}
      />
      <div className='partition_container'>
        {Array(numPartitionsToShow).fill().map((_, index) => (
          <div
            key={index}
            className='partition'
            style={{
              height: `${140 / totalNumPartitions}px`,
              width: `${(numPartitionsToShow - index) % 10 === 0 ? '20px' : (
                (numPartitionsToShow - index) % 5 === 0 ? '10px' : '5px'
              )}`,
              borderColor: `${(numPartitionsToShow - index) % 10 === 0 ? 'black' : (
                (numPartitionsToShow - index) % 5 === 0 ? 'maroon' : 'brown'
              )}`
            }}
          />
        ))}
      </div>  
      <div
        className={`partition_hider ${isValueIncreasing ? 'fast' : 'slow'}`}
        style={{ height: `${140 * (maxValue - value) / maxValue}px` }}
      />
    </div>
  );
};
