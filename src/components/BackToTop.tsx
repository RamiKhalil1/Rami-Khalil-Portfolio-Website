import React from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { useBackToTop } from '../hooks/useBackToTop';
import './BackToTop.css';

const BackToTop: React.FC = () => {
  const { isVisible, scrollToTop } = useBackToTop();

  return (
    <button 
      className={`back-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FaChevronUp />
    </button>
  );
};

export default BackToTop;
