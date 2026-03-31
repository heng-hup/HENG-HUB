import React, { useState, useEffect, useCallback } from 'react';
// แก้ไขบรรทัดนี้: นำเข้าแบบ Default ทั้งหมด
import * as ReactWindow from 'react-window';
import { fetchButtons } from '../../services/buttonService';

// ดึง FixedSizeGrid ออกมาจากก้อนใหญ่
const { FixedSizeGrid } = ReactWindow;

const ProfileGrid = () => {
  const [items, setItems] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMoreData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data, lastVisible } = await fetchButtons(lastDoc);
      if (data && data.length > 0) {
        setItems(prev => [...prev, ...data]);
        setLastDoc(lastVisible);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [lastDoc, loading]);

  useEffect(() => {
    loadMoreData();
  }, []);

  const ButtonItem = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    const item = items[index];
    if (!item) return null;

    return (
      <div style={style} className="p-1">
        <div className="w-full h-full bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-sm active:scale-90 transition-transform cursor-pointer overflow-hidden">
          <img 
            src={item.iconUrl || 'https://via.placeholder.com/100'} 
            className="w-12 h-12 rounded-full mb-1 object-cover" 
            alt="icon" 
          />
          <span className="text-[10px] font-medium text-gray-700 truncate w-full px-2 text-center">
            {item.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center bg-[#F8F9FA] min-h-screen">
      <div className="w-full max-w-[360px] px-4 pt-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#00338D]">บริการทั้งหมด</h2>
          <span className="bg-[#F2D06B] text-[#00338D] text-[10px] px-2 py-1 rounded-full font-bold">
            {items.length} รายการ
          </span>
        </div>

        {items.length > 0 ? (
          <FixedSizeGrid
            columnCount={3}
            columnWidth={110}
            rowCount={Math.ceil(items.length / 3)}
            rowHeight={120}
            height={window.innerHeight - 160}
            width={330}
            onItemsRendered={({ visibleRowStopIndex }) => {
              if (visibleRowStopIndex >= Math.ceil(items.length / 3) - 3) {
                loadMoreData();
              }
            }}
          >
            {ButtonItem}
          </FixedSizeGrid>
        ) : (
          <div className="flex flex-col items-center mt-20 text-gray-400">
             <p className="text-sm">กำลังเชื่อมต่อฐานข้อมูล HENG...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileGrid;
