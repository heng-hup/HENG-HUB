import React, { useState } from 'react';
import { Search, Phone, Menu, UserPlus, X, Plus, Smile, Mic, Send } from 'lucide-react'; 
import { ActionButtons } from './components/ActionButtons';
import ToolGrid from './components/ToolGrid';

// --- [1] Import Actions ที่สร้างไว้แยกไฟล์ (ปุ่มใครปุ่มมัน) ---
import * as CopyAll from './actions/contextMenu/CopyAllBtn';
import * as Translate from './actions/contextMenu/TranslateBtn';
import * as SaveNote from './actions/contextMenu/SaveNoteBtn';
import * as DeleteMsg from './actions/contextMenu/DeleteMsgBtn';
import * as Reply from './actions/contextMenu/ReplyBtn';
import * as Share from './actions/contextMenu/ShareBtn';
import * as Pin from './actions/contextMenu/PinBtn';
import * as Capture from './actions/contextMenu/CaptureBtn';
import * as Unsend from './actions/contextMenu/UnsendBtn';
import * as EmojiAction from './actions/contextMenu/EmojiAction';

// Import Component เมนูคลิกขวา
import MessageContextMenu from './components/MessageContextMenu.jsx';

export default function HengHengSuperApp() {
  // --- [2] State เดิมของคุณนัต (ห้ามลบ) ---
  const [showTools, setShowTools] = useState(false);
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // --- [3] State ใหม่สำหรับระบบเมนู 20 ปุ่ม ---
  const [contextMenu, setContextMenu] = useState(null); 
  const [replyTo, setReplyTo] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [pinnedList, setPinnedList] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // รวม Setters เพื่อส่งไปให้สคริปต์ย่อยสั่งงาน
  const chatSetters = { setMessages, setReplyTo, setShowSidebar, setPinnedList, setIsCollapsed };

  // --- [4] ฟังก์ชันหลักเดิม (ห้ามลบ) ---
  const sendMessage = (content, type = 'text') => {
    if (type === 'text' && !content?.trim() && !text.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      content: content || text,
      type: type, 
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      msgId: Date.now().toString(),
      msgText: content || text,
      // เพิ่มข้อมูลการตอบกลับเข้าไปในข้อความใหม่ (ถ้ามี)
      replyData: replyTo ? { ...replyTo } : null 
    };
    
    setMessages(prev => [...prev, newMsg]);
    setText("");
    setShowTools(false);
    setShowCallMenu(false);
    setReplyTo(null); 
  };

  // --- [5] ฟังก์ชันจัดการ Action จากเมนูคลิกขวา ---
  const handleContextMenuAction = (actionId, data) => {
    switch (actionId) {
      case 'copy_all':    CopyAll.exec(data.msgText); break;
      case 'translate':   Translate.exec(data.msgText); break;
      case 'note':        SaveNote.exec(data.msgText, chatSetters); break;
      case 'delete_local': DeleteMsg.exec(data.msgId, chatSetters); break;
      case 'reply':       Reply.exec(data, chatSetters); break;
      case 'share':       Share.exec(data.msgText); break;
      case 'pin':         Pin.exec(data, chatSetters); break;
      case 'capture':     Capture.exec(data.msgId); break;
      case 'unsend':      Unsend.exec(data.msgId, chatSetters); break;
      case 'close_menu_only': setContextMenu(null); break;
      default: console.log("Action ID:", actionId);
    }
    setContextMenu(null); // ปิดเมนูหลังกดใช้งาน
  };

  const handleEmojiReaction = (emoji, msgId) => {
    EmojiAction.exec(emoji, msgId, chatSetters);
    setContextMenu(null);
  };

  // ฟังก์ชันเปิดเมนู (คำนวณพิกัดให้ทับกลางบรรทัด)
  const onContextMenu = (e, m) => {
    e.preventDefault();
    // ใช้ clientX/Y เพื่อความแม่นยำในการวางตำแหน่ง Fixed
    setContextMenu({ x: e.clientX, y: e.clientY, msg: m }); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', backgroundColor: '#F5F5F5', overflow: 'hidden', position: 'relative' }}>
      
      {/* Header เดิมของคุณนัต */}
      <div style={{ backgroundColor: '#FFD700', padding: '10px 15px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', backgroundColor: '#001F3F', borderRadius: '50%', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>H</div>
          <span style={{ fontWeight: 'bold', color: '#001F3F', fontSize: '18px' }}>HENG HENG</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#001F3F' }}>
          <Search size={22} />
          <div style={{ position: 'relative' }}>
            <Phone size={22} onClick={() => setShowCallMenu(!showCallMenu)} style={{ cursor: 'pointer' }} />
            {showCallMenu && (
              <div style={{ position: 'absolute', top: '40px', right: '-10px', backgroundColor: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '12px', width: '140px', overflow: 'hidden', zIndex: 1000 }}>
                <div onClick={() => sendMessage('กำลังโทรออก...', 'action')} style={{ padding: '12px', borderBottom: '1px solid #EEE', cursor: 'pointer', color: '#001F3F' }}>โทร</div>
                <div onClick={() => sendMessage('กำลังเริ่มวิดีโอคอล...', 'action')} style={{ padding: '12px', cursor: 'pointer', color: '#001F3F' }}>วิดีโอคอล</div>
              </div>
            )}
          </div>
          <UserPlus size={22} onClick={() => sendMessage('สร้างกลุ่มใหม่เรียบร้อย', 'action')} style={{ cursor: 'pointer' }} /> 
          <Menu size={22} />
        </div>
      </div>

      {/* Chat Area + ดัก Context Menu */}
      <div 
        style={{ flex: 1, overflowY: 'auto', padding: '15px' }} 
        onClick={() => { setShowCallMenu(false); setShowTools(false); setContextMenu(null); }}
      >
        {messages.map(m => (
          <div 
            key={m.id} 
            style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}
            onContextMenu={(e) => onContextMenu(e, m)}
          >
            <div id={`msg-${m.msgId}`} style={{ 
              maxWidth: '75%', 
              backgroundColor: m.type === 'text' ? '#001F3F' : (m.type === 'action' ? '#FFD700' : 'transparent'),
              padding: m.type === 'text' || m.type === 'action' ? '10px 15px' : '0',
              borderRadius: '15px', 
              color: m.type === 'action' ? '#001F3F' : '#FFF',
              position: 'relative',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              {/* แสดงข้อความที่ตอบกลับ (ถ้ามี) */}
              {m.replyData && (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '8px', marginBottom: '5px', borderLeft: '3px solid #FFD700', fontSize: '12px' }}>
                   <div style={{ fontWeight: 'bold', color: '#FFD700' }}>{m.replyData.sender}</div>
                   <div style={{ opacity: 0.8 }}>{m.replyData.text}</div>
                </div>
              )}

              {m.reaction && <div style={{ position: 'absolute', bottom: '-10px', left: '0', fontSize: '16px', background: '#FFF', borderRadius: '50%', padding: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{m.reaction}</div>}
              {m.type === 'image' && <img src={m.content} style={{ width: '100%', borderRadius: '15px', border: '2px solid #001F3F' }} />}
              {m.type === 'video' && <video src={m.content} controls style={{ width: '100%', borderRadius: '15px' }} />}
              {m.type === 'text' && <span>{m.content}</span>}
              {m.type === 'action' && <span style={{ fontWeight: 'bold' }}>{m.content}</span>}
              <div style={{ fontSize: '10px', textAlign: 'right', marginTop: '5px', opacity: 0.7 }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ฟีเจอร์ "ตอบกลับ" UI (แถบสีเหลืองหรู) */}
      {replyTo && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '10px 15px', borderLeft: '5px solid #FFD700', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EEE' }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', color: '#001F3F', fontWeight: 'bold' }}>กำลังตอบกลับคุณ {replyTo.sender}</div>
            <div style={{ fontSize: '13px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{replyTo.text}</div>
          </div>
          <X size={20} color="#999" style={{ cursor: 'pointer' }} onClick={() => setReplyTo(null)} />
        </div>
      )}

      {/* Footer เดิมของคุณนัต */}
      <div style={{ backgroundColor: '#001F3F', paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 101 }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', gap: '12px' }}>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => setShowTools(!showTools)}>
            {showTools ? <X size={26} color="#FFD700" /> : <Plus size={26} color="#FFD700" />}
          </button>
          <ActionButtons onSend={sendMessage} />
          <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '25px', display: 'flex', alignItems: 'center', padding: '6px 15px', margin: '0 5px' }}>
            <input 
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', padding: '5px 0' }} 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="พิมพ์ข้อความ" 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Smile size={20} color="#999" />
          </div>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => sendMessage()}>
            {text.trim() === "" ? <Mic size={26} color="#FFD700" /> : <Send size={26} color="#FFD700" />}
          </button>
        </div>
        {showTools && <ToolGrid onSend={sendMessage} />}
      </div>

      {/* ส่วนเรียกใช้ Context Menu (เมนูเด้งทับหน้าสุด) */}
      {contextMenu && (
        <MessageContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          msg={contextMenu.msg}
          onAction={handleContextMenuAction}
          onEmoji={(emoji) => handleEmojiReaction(emoji, contextMenu.msg.msgId)}
        />
      )}
    </div>
  );
}


