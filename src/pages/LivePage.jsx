import React from 'react';
import HostView from '../components/LiveStream/HostView';

const LivePage = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* ในอนาคตจะดึงรายการไลฟ์มา Map ที่นี่ */}
      <HostView /> 
    </div>
  );
};

export default LivePage;
