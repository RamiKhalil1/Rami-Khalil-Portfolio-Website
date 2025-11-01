import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import './ScrollProgress.css';

const ScrollProgress: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div 
      className="scroll-progress"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ScrollProgress;
