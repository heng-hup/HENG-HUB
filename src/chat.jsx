import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Menu, UserPlus, X, Plus, Smile, Mic, Send } from 'lucide-react'; 

// --- [1] Import Components & Actions (รักษาไว้ครบถ้วน) ---
import { ActionButtons } from './components/ActionButtons';
import ToolGrid from './components/ToolGrid';
import MessageContextMenu from './components/MessageContextMenu.jsx';

// Import Logic ของแต่ละปุ่ม (รักษาไว้ครบถ้วน)
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

export default function HengHengSuperApp() {
  // --- [2] State Management ---
  const [showTools, setShowTools] = useState(false);
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  
  // State สำหรับระบบ Context Menu 20 ปุ่ม
  const [contextMenu, setContextMenu] = useState(null); 
  const [replyTo, setReplyTo] = useState(null); // สำหรับฟีเจอร์ตอบกลับ
  const [pinnedList, setPinnedList] = useState([]); // สำหรับข้อความประกาศ (Pin)
  
  const chatContainerRef = useRef(null);

  // รวม Setters ส่งไปให้ Action ย่อยๆ เรียกใช้งาน
  const chatSetters = { 
    setMessages, 
    setReplyTo, 
    setPinnedList,
    closeMenu: () => setContextMenu(null)
  };

  // --- [3] Core Functions ---
  const sendMessage = (content, type = 'text') => {
    if (type === 'text' && !content?.trim() && !text.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      msgId: Date.now().toString(),
      content: content || text,
      msgText: content || text, // เก็บไว้สำหรับฟังก์ชัน Copy/Translate
      type: type, 
      sender: 'me',
      senderName: 'คุณนัต',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyData: replyTo ? { ...replyTo } : null, // เก็บข้อมูลการตอบกลับ
      reaction: null
    };
    
    setMessages(prev => [...prev, newMsg]);
    setText("");
    setReplyTo(null); // เคลียร์สถานะตอบกลับหลังส่ง
    setShowTools(false);
  };

  // จัดการ Action เมื่อกดปุ่มในเมนูคลิกขวา (รักษา Logic เดิม 100%)
  const handleContextMenuAction = (actionId, data) => {
    switch (actionId) {
      case 'copy_all':    CopyAll.exec(data.msgText); break;
      case 'translate':   Translate.exec(data.msgText); break;
      case 'note':        SaveNote.exec(data, chatSetters); break;
      case 'delete_local': DeleteMsg.exec(data.msgId, chatSetters); break;
      case 'reply':       Reply.exec(data, chatSetters); break;
      case 'share':       Share.exec(data.msgText); break;
      case 'pin':         Pin.exec(data, chatSetters); break;
      case 'capture':     Capture.exec('chat-area'); break; 
      case 'unsend':      Unsend.exec(data.msgId, chatSetters); break;
      default: console.log("Action ID:", actionId);
    }
    setContextMenu(null);
  };

  const handleEmojiReaction = (emoji, msgId) => {
    EmojiAction.exec(emoji, msgId, chatSetters);
    setContextMenu(null);
  };

  const onContextMenu = (e, m) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, msg: m }); 
  };

  // --- [4] Render UI ---
  return (
    <div style={styles.appContainer}>
      
      {/* Header Area */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoBadge}>H</div>
          <span style={styles.brandName}>HENG HENG</span>
        </div>
        
        <div style={styles.headerIcons}>
          <Search size={22} />
          <div style={{ position: 'relative' }}>
            <Phone size={22} onClick={() => setShowCallMenu(!showCallMenu)} style={{ cursor: 'pointer' }} />
            {showCallMenu && (
              <div style={styles.callDropdown}>
                <div onClick={() => sendMessage('กำลังโทรออก...', 'action')} style={styles.dropdownItem}>โทร</div>
                <div onClick={() => sendMessage('กำลังเริ่มวิดีโอคอล...', 'action')} style={styles.dropdownItem}>วิดีโอคอล</div>
              </div>
            )}
          </div>
          <UserPlus size={22} onClick={() => sendMessage('สร้างกลุ่มใหม่เรียบร้อย', 'action')} /> 
          <Menu size={22} />
        </div>
      </div>

      {/* Pinned Messages */}
      {pinnedList.length > 0 && (
        <div style={styles.pinBar}>
          📌 {pinnedList[pinnedList.length - 1].msgText}
        </div>
      )}

      {/* Chat Content Area (เพิ่มความยืดหยุ่นให้ Scroll ลื่นบนมือถือ) */}
      <div 
        id="chat-area"
        ref={chatContainerRef}
        style={styles.chatArea} 
        onClick={() => { setShowCallMenu(false); setShowTools(false); setContextMenu(null); }}
      >
        {messages.map(m => (
          <div 
            key={m.id} 
            style={styles.messageRow}
            onContextMenu={(e) => onContextMenu(e, m)}
          >
            <div id={`msg-${m.msgId}`} style={{
              ...styles.messageBubble,
              backgroundColor: m.type === 'text' ? '#001F3F' : (m.type === 'action' ? '#FFD700' : 'transparent'),
              color: m.type === 'action' ? '#001F3F' : '#FFF',
            }}>
              {m.replyData && (
                <div style={styles.innerReplyBox}>
                   <div style={{ fontWeight: 'bold', color: '#FFD700' }}>{m.replyData.sender}</div>
                   <div style={{ opacity: 0.8, fontSize: '11px' }}>{m.replyData.text}</div>
                </div>
              )}
              {m.reaction && <div style={styles.reactionBadge}>{m.reaction}</div>}
              {m.type === 'text' && <span>{m.content}</span>}
              {m.type === 'action' && <span style={{ fontWeight: 'bold' }}>{m.content}</span>}
              <div style={styles.msgTime}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Preview UI */}
      {replyTo && (
        <div style={styles.replyPreviewBar}>
          <div style={styles.replyPreviewInfo}>
            <div style={styles.replySender}>กำลังตอบกลับคุณ {replyTo.sender}</div>
            <div style={styles.replyText}>{replyTo.text}</div>
          </div>
          <X size={20} color="#999" onClick={() => setReplyTo(null)} style={{cursor:'pointer'}} />
        </div>
      )}

      {/* Footer Area (ปรับให้รองรับ Safe Area ของมือถือ) */}
      <div style={styles.footer}>
        <div style={styles.inputRow}>
          <button style={styles.iconBtn} onClick={() => setShowTools(!showTools)}>
            {showTools ? <X size={26} color="#FFD700" /> : <Plus size={26} color="#FFD700" />}
          </button>
          
          <ActionButtons onSend={sendMessage} />
          
          <div style={styles.inputContainer}>
            <input 
              style={styles.textInput} 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="พิมพ์ข้อความ" 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Smile size={20} color="#999" />
          </div>

          <button style={styles.iconBtn} onClick={() => sendMessage()}>
            {text.trim() === "" ? <Mic size={26} color="#FFD700" /> : <Send size={26} color="#FFD700" />}
          </button>
        </div>
        {/* แผงไอคอน ToolGrid */}
        {showTools && <ToolGrid onSend={sendMessage} />}
      </div>

      {/* Context Menu 20 ปุ่ม */}
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

// --- [5] Styles (ฉบับสมบูรณ์: คอมไม่เพี้ยน มือถือไม่ขาด) ---
const styles = {
  appContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%',     
    width: '100%', 
    backgroundColor: '#F5F5F5', 
    overflow: 'hidden', 
    position: 'relative',
    boxSizing: 'border-box'
  },
  header: { 
    backgroundColor: '#FFD700', 
    padding: '10px 15px', 
    height: '60px', 
    minHeight: '60px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    zIndex: 100, 
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    boxSizing: 'border-box'
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoBadge: { width: '35px', height: '35px', backgroundColor: '#001F3F', borderRadius: '50%', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' },
  brandName: { fontWeight: 'bold', color: '#001F3F', fontSize: '18px' },
  headerIcons: { display: 'flex', alignItems: 'center', gap: '18px', color: '#001F3F' },
  callDropdown: { position: 'absolute', top: '50px', right: '10px', backgroundColor: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '12px', width: '140px', overflow: 'hidden', zIndex: 1000 },
  dropdownItem: { padding: '12px', borderBottom: '1px solid #EEE', cursor: 'pointer', color: '#001F3F' },
  pinBar: { backgroundColor: '#FFF9E6', padding: '8px 15px', fontSize: '13px', borderBottom: '1px solid #FFE699', color: '#856404' },
  chatArea: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '15px',
    WebkitOverflowScrolling: 'touch' 
  },
  messageRow: { display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' },
  messageBubble: { maxWidth: '80%', padding: '10px 15px', borderRadius: '15px', position: 'relative', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  innerReplyBox: { backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '8px', marginBottom: '5px', borderLeft: '3px solid #FFD700' },
  reactionBadge: { position: 'absolute', bottom: '-10px', left: '0', fontSize: '16px', background: '#FFF', borderRadius: '50%', padding: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' },
  msgTime: { fontSize: '10px', textAlign: 'right', marginTop: '5px', opacity: 0.7 },
  replyPreviewBar: { 
    backgroundColor: '#FFFFFF', 
    padding: '8px 15px', 
    borderLeft: '5px solid #FFD700', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderTop: '1px solid #EEE',
    maxHeight: '60px'
  },
  replyPreviewInfo: { overflow: 'hidden' },
  replySender: { fontSize: '12px', color: '#001F3F', fontWeight: 'bold' },
  replyText: { fontSize: '13px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  footer: { 
    backgroundColor: '#001F3F', 
    paddingBottom: 'env(safe-area-inset-bottom)', 
    zIndex: 101,
    boxSizing: 'border-box'
  },
  inputRow: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '10px 15px', 
    gap: '10px',
    minHeight: '60px' 
  },
  iconBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  inputContainer: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    borderRadius: '25px', 
    display: 'flex', 
    alignItems: 'center', 
    padding: '4px 15px',
    overflow: 'hidden'
  },
  textInput: { 
    flex: 1, 
    border: 'none', 
    outline: 'none', 
    fontSize: '15px', 
    padding: '6px 0',
    backgroundColor: 'transparent'
  },
};
