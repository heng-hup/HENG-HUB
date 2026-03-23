import React from 'react';
import ToolButton from './ToolButton';

export default function CalendarBtn({ onSend }) {
  const pickDate = () => {
    // ในเบราว์เซอร์มือถือจะเรียก Native Calendar ขึ้นมา
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.onchange = (e) => onSend(`📅 นัดหมายวันที่: ${e.target.value}`);
    dateInput.click();
  };

  return <ToolButton icon="📅" label="ปฏิทิน" onClick={pickDate} />;
}
