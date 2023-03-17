import { useRef } from 'react';
import './AnimatedStatBar.scss';

export const AnimatedStatBar = ({ value, maxValue, type }) => {
  const lastValueRef = useRef(maxValue);
  const isValueIncreasing = lastValueRef.current < value;
  lastValueRef.current = value;

  return (
    <div className={`animated_stat_bar ${type}`}>
      <div
        className={`background ${isValueIncreasing ? 'fast' : 'slow'}`}
        style={{ height: `${150 * value / maxValue}px` }}
      />
      <div
        className={`foreground ${isValueIncreasing ? 'slow' : 'fast'}`}
        style={{ height: `${150 * value / maxValue}px` }}
      />
    </div>
  );
};
