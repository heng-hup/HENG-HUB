import React from 'react';
import ToolButton from './ToolButton';

export default function CalcBtn({ onClick }) {
  return (
    <ToolButton 
      icon="🧮" 
      label="คิดเลข" 
      onClick={onClick} 
    />
  );
}
