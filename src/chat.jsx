import React, { useState, useRef } from 'react';
import { 
  Mic, Search, Phone, Menu, Camera, Image, Smile, Send, X, Plus, 
  ChevronDown, ChevronUp, Video 
} from 'lucide-react'; 
import { st } from './styles/chatStyles';
import ToolGrid from './components/ToolGrid';


// นำเข้า Modal และ Component ย่อย
import MessageContextMenu from './components/MessageContextMenu';
import CreateGroupModal from './components/CreateGroupModal';
import MediaGalleryModal from './components/MediaGalleryModal';
import CalculatorModal from './components/CalculatorModal';
import CalendarModal from './components/CalendarModal';
import NoteManager from './components/NoteManager';
import MessageBubble from './components/MessageBubble';
import StickerPicker from './components/StickerPicker';

export default function HengHengSuperApp() {
  const [showTools, setShowTools] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "มาแชทกันเถอะ", 
      sender: 'friend', 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }
  ]);
  
  const [contextMenu, setContextMenu] = useState(null); 
  const [replyTo, setReplyTo] = useState(null);
  const [pinnedList, setPinnedList] = useState([]); 
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [notesList, setNotesList] = useState([]); 
  const [showSidebar, setShowSidebar] = useState(false); 

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [friendsList] = useState([
    { id: 1, name: 'หนุ่ม กรรชัย', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'ลิซ่า Blackpink', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'พี่เอก HEARTROCKER', avatar: 'https://i.pravatar.cc/150?u=3' },
  ]);

  const scrollToMessage = (msgId) => {
    const element = document.getElementById(`msg-${msgId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.style.transition = 'background-color 0.5s';
      element.style.backgroundColor = '#FFD700';
      setTimeout(() => { element.style.backgroundColor = ''; }, 1500);
    }
  };

    const sendMessage = (content, type = 'text') => {
    const messageContent = content || text;
    if (type === 'text' && !messageContent.trim()) return;

    const myMsg = { 
      id: Date.now(), 
      text: type === 'text' ? messageContent : "",
      sticker: type === 'sticker' ? content : null,
      image: type === 'image' ? content : null, // เพิ่มบรรทัดนี้
      file: type === 'file' ? content : null,   // เพิ่มบรรทัดนี้
      sender: 'me', 
      replyData: replyTo ? { ...replyTo } : null,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    };

    setMessages([...messages, myMsg]);
    setReplyTo(null);
    setText("");
    setShowTools(false);
    setShowStickers(false);
  };

  // --- 🛠️ ส่วนที่แก้ไข: handleMenuAction เพิ่มเงื่อนไขให้ครอบคลุมชื่อปุ่ม ---
  const handleMenuAction = (type, data) => {
    if (type === 'close_menu_only') return setContextMenu(null);
    
    const msgText = data?.msgText || data?.text || ""; 
    const msgId = data?.msgId || data?.id;

    switch (type) {
      case 'copy_all':
        navigator.clipboard.writeText(msgText);
        alert("📋 คัดลอกข้อความทั้งหมดแล้ว");
        break;

      case 'translate':
        if (msgText) {
          const translateUrl = `https://translate.google.com/?sl=auto&tl=th&text=${encodeURIComponent(msgText)}&op=translate`;
          window.open(translateUrl, '_blank');
        }
        break;

      case 'capture': // ✅ เพิ่มความแม่นยำในการเรียกใช้ window.html2canvas
        const element = document.getElementById(`msg-${msgId}`);
        if (element && typeof window.html2canvas !== 'undefined') {
          window.html2canvas(element).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `chat-capture-${msgId}.png`;
            link.href = image;
            link.click();
          });
        } else {
          alert("กรุณาติดตั้ง/เรียกใช้ html2canvas script ใน index.html");
        }
        break;

      case 'share':
        if (navigator.share) {
          navigator.share({ title: 'ส่งต่อแชท', text: msgText });
        } else {
          alert("แชร์ข้อความ: " + msgText);
        }
        break;

      case 'pin':
        if (msgText) {
          setPinnedList([{ id: Date.now(), msgId: msgId, text: msgText }, ...pinnedList]);
          setIsCollapsed(false);
        }
        break;

      case 'note':
        setNotesList([{ id: Date.now(), content: msgText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }, ...notesList]);
        setShowSidebar(true); 
        break;

      // ✅ แก้จุดบกพร่อง: เพิ่มชื่อ Case ให้ตรงกับที่ไฟล์เมนูอาจจะส่งมา
      case 'delete':
      case 'delete_local': 
        setMessages(messages.filter(m => m.id !== msgId));
        break;

      case 'unsend': // ✨ เพิ่มฟังก์ชันยกเลิกข้อความ (ลบ 2 ฝั่ง)
        if (window.confirm("ต้องการยกเลิกข้อความนี้ใช่หรือไม่?")) {
           setMessages(messages.filter(m => m.id !== msgId));
        }
        break;

      case 'reply':
        setReplyTo({ id: msgId, text: msgText });
        break;

      default:
        console.log("Action:", type);
    }
    setContextMenu(null);
  };

  const handleToolAction = (actionType, value) => {
    if (actionType === 'send') return sendMessage(value);
    
    const run = {
      'pin_view': () => setIsCollapsed(false),
      'note': () => { setShowSidebar(true); setShowTools(false); },
      'send_gift': () => {
        const gifts = ["🎁 ส่งรอยยิ้มพิมพ์ใจให้คุณ", "💐 มอบดอกไม้ดิจิทัลให้ครับ", "☕️ ฝากกาแฟร้อนๆ ไปให้จิบนะ", "⭐ มอบดาวนำโชคให้คุณ"];
        sendMessage(gifts[Math.floor(Math.random() * gifts.length)]);
      },
      'open_map': () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const url = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
            sendMessage(`📍 ตำแหน่งของฉัน: ${url}`);
          }, () => alert("กรุณาเปิดการเข้าถึง GPS"));
        }
      },
            'open_file': () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const ext = file.name.split('.').pop().toLowerCase();
            // ส่ง Object แทน String เพื่อให้ MessageBubble แยกแยะได้
            sendMessage({
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
              ext: ext,
              url: URL.createObjectURL(file)
            }, 'file'); 
          }
        };
        input.click();
      },
      'open_camera': () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const url = URL.createObjectURL(file);
            sendMessage(url, 'image'); // เปลี่ยนจากส่งชื่อไฟล์ เป็นส่ง URL รูป
          }
        };
        input.click();
      },
      'open_gallery': () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const url = URL.createObjectURL(file);
            sendMessage(url, 'image'); // เปลี่ยนจากส่งชื่อไฟล์ เป็นส่ง URL รูป
          }
        };
        input.click();
      },
      'calculator': () => setShowCalculator(true),
      'media': () => setShowMedia(true),
      'create_group': () => setShowCreateGroup(true),
      'calendar': () => setShowCalendar(true),
      'call': () => alert('กำลังโทรออก...'),
      'video_call': () => alert('กำลังเริ่มวิดีโอคอล...'),
      'open_mail': () => { window.location.href = "mailto:?subject=ติดต่อจาก HENG HENG Super App"; },
      'open_contacts': async () => {
        const confirmAccess = window.confirm("อนุญาตให้เข้าถึงรายชื่อในเครื่อง?");
        if (confirmAccess) {
          if ('contacts' in navigator && 'ContactsManager' in window) {
            try {
              const props = ['name', 'tel'];
              const contacts = await navigator.contacts.select(props, { multiple: false });
              if (contacts.length > 0) {
                sendMessage(`📇 รายชื่อ: ${contacts[0].name[0]} (${contacts[0].tel[0]})`);
              }
            } catch (ex) { console.log("Cancelled"); }
          } else {
            const friend = friendsList[Math.floor(Math.random() * friendsList.length)];
            sendMessage(`📇 รายชื่อเพื่อน: ${friend.name}`);
          }
        }
      },
    };
    if (run[actionType]) run[actionType]();
  };

  const handleContextMenu = (e, msg) => {
    const hasSelection = window.getSelection().toString().length > 0;
    if (hasSelection) return; 

    e.preventDefault(); 
    const xPos = msg.sender === 'friend' ? 80 : window.innerWidth - 400;
    
    setContextMenu({ 
      x: xPos, 
      y: e.clientY - 100, 
      msgId: msg.id, 
      msgText: msg.text 
    });
  };

  return (
    <div style={{...st.container, userSelect: 'text'}} onClick={() => { setContextMenu(null); setShowSidebar(false); setShowStickers(false); }}>
      
      {/* 1. Header */}
      <div style={st.header}>
        <div style={st.headerFlex}>
           <div style={st.avatar}>⚡️</div>
           {!isSearching ? (
             <div style={{fontWeight: 'bold', flex: 1, color: '#001F3F'}}>HENG HENG</div>
           ) : (
             <input 
               autoFocus
               placeholder="ค้นหาข้อความ..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={{ flex: 1, border: 'none', background: '#F0F0F0', borderRadius: '10px', padding: '5px 10px', outline: 'none', fontSize: '14px' }}
             />
           )}
           <div style={st.headerIcons}>
             <Search size={20} onClick={() => { setIsSearching(!isSearching); if(isSearching) setSearchTerm(""); }} style={{cursor: 'pointer'}} />
             <Phone size={20} onClick={() => handleToolAction('call')} style={{cursor: 'pointer'}} />
             <Video size={20} onClick={() => handleToolAction('video_call')} style={{cursor: 'pointer'}} />
             <Menu size={20} onClick={(e) => { e.stopPropagation(); setShowSidebar(true); }} style={{cursor: 'pointer'}} />
           </div>
        </div>
      </div>

                   {/* --- แถบปักหมุด --- */}
      {pinnedList.length > 0 && !isCollapsed && (
        <div style={{
          position: 'absolute',
          top: '60px', // ชิดขอบล่างของแถบเหลืองพอดี
          left: '0',
          right: '0',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderBottom: '1px solid #E0E0E0',
          zIndex: 1000,
          maxHeight: '40vh',
          overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {pinnedList.map((pin) => (
            <div 
              key={pin.id} 
              onClick={() => { 
                scrollToMessage(pin.msgId); // 1. เด้งไปที่ข้อความที่ปักหมุด
                setIsCollapsed(true);       // 2. ย่อเก็บแถบทันทีเพื่อให้เห็นข้อความชัดๆ
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '10px 15px',
                borderBottom: '1px solid #F5F5F5',
                cursor: 'pointer'
              }}
            >
              <span style={{ marginRight: '10px' }}>📢</span>
              <div style={{ 
                flex: 1, 
                fontSize: '13px', 
                color: '#333', 
                lineHeight: '1.4',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap' 
              }}>
                {pin.text}
              </div>
              <X 
                size={14} 
                style={{ marginLeft: '10px', color: '#CCC' }} 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setPinnedList(pinnedList.filter(p => p.id !== pin.id)); 
                }} 
              />
            </div>
          ))}

          {/* ปุ่มปิดแถบแบบแมนนวล */}
          <div 
            onClick={() => setIsCollapsed(true)}
            style={{ 
              padding: '8px', 
              textAlign: 'center', 
              fontSize: '11px', 
              color: '#999', 
              backgroundColor: '#FAFAFA',
              cursor: 'pointer'
            }}
          >
            🔼 ปิดแถบรายการ
          </div>
        </div>
      )}

      {/* ปุ่มหมุด📌 (โชว์เมื่อย่อเก็บ) */}
      {pinnedList.length > 0 && isCollapsed && (
        <div 
          onClick={() => setIsCollapsed(false)}
          style={{
            position: 'absolute',
            top: '65px',
            right: '15px',
            backgroundColor: '#FFD700',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          📌
        </div>
      )}

      {/*  Floating Date - เรียลไทม์ เปลี่ยนปีอัตโนมัติ 5 วินาทีหาย */}
      <div 
        id="date-float-realtime"
        style={{
          position: 'fixed', top: '85px', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', zIndex: 9999,
          pointerEvents: 'none', opacity: 0, transition: 'opacity 0.6s ease-in-out'
        }}
      >
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'white',
          padding: '5px 15px', borderRadius: '20px', fontSize: '12px',
          backdropFilter: 'blur(5px)', fontWeight: '400'
        }}>
          {/* แสดงวันที่ปัจจุบัน ค.ศ. 2026 เรียลไทม์ */}
          {(() => {
            const d = new Date();
            const dayName = d.toLocaleDateString('th-TH', { weekday: 'short' });
            const day = d.getDate();
            const month = d.toLocaleDateString('th-TH', { month: 'short' });
            const year = d.getFullYear(); 
            return `${dayName} ${day} ${month} ${year}`;
          })()}
        </div>
      </div>

      {/* ตัวสั่งงาน Logic ทั้งหมด (Trigger) */}
      <img src="x" onError={() => {
        if (typeof window !== 'undefined' && !window.dateSystemInit) {
          window.dateSystemInit = true;

          // 1. Logic สำหรับ "ตัวลอย" (เลื่อนแล้วขึ้น 5 วิหาย)
          window.addEventListener('scroll', () => {
            const el = document.getElementById('date-float-realtime');
            if (el) {
              el.style.opacity = '1';
              clearTimeout(window.dTimer);
              window.dTimer = setTimeout(() => { el.style.opacity = '0'; }, 5000);
            }
          }, true);

          // 2. Logic สำหรับ "ตัวคั่นวันใหม่" (แทรกให้อัตโนมัติหลังโหลดหน้าจอ)
          setTimeout(() => {
            const chatContainer = document.querySelector('[style*="overflow-y: auto"]');
            if (chatContainer) {
              // ฟังก์ชันนี้จะไปหาจุดที่วันเปลี่ยน แล้วฉีดแถบวันที่เข้าไปเอง
              const bubbles = chatContainer.querySelectorAll('[class*="message"]'); // หา bubble ข้อความ
              let lastDate = "";
              
              bubbles.forEach((b) => {
                // สมมติว่าพี่มี attribute หรือ text ที่บอกเวลาใน bubble
                // ถ้าไม่มี ระบบจะยึดตามวันที่ปัจจุบันคั่นหน้าข้อความแรกของวัน
                const now = new Date().toLocaleDateString('th-TH');
                if (lastDate !== now) {
                  const hr = document.createElement('div');
                  hr.innerHTML = `<div style="display:flex;justify-content:center;margin:15px 0;">
                    <div style="background:rgba(0,0,0,0.05);color:#888;padding:2px 12px;border-radius:12px;font-size:11px;">
                      ${document.getElementById('date-float-realtime').innerText}
                    </div>
                  </div>`;
                  b.parentNode.insertBefore(hr, b);
                  lastDate = now;
                }
              });
            }
          }, 1000);
        }
      }} style={{ display: 'none' }} />

      {/* 2. Chat Area */}
      <div style={st.chatArea}>
        {messages
          .filter(m => !isSearching || (m.text && m.text.toLowerCase().includes(searchTerm.toLowerCase())))
          .map(m => (
            <div key={m.id} id={`msg-${m.id}`} style={{...st.msgRow, justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start'}}>
              <MessageBubble 
                m={m} 
                isSearching={isSearching} 
                searchTerm={searchTerm} 
                onContextMenu={handleContextMenu} 
              />
            </div>
          ))}
        {contextMenu && ( 
          <MessageContextMenu 
            x={contextMenu.x} y={contextMenu.y} msg={contextMenu} 
            onEmoji={(selectedEmoji) => { 
              setMessages(messages.map(m => {
                if(m.id === contextMenu.msgId) {
                  return { ...m, emoji: m.emoji === selectedEmoji ? null : selectedEmoji };
                }
                return m;
              })); 
              setContextMenu(null); 
            }} 
            onAction={handleMenuAction} 
          /> 
        )}
      </div>

      {/* 3. Footer */}
      <div style={{...st.footer, height: showTools ? '260px' : (replyTo ? '130px' : '90px')}}>
        {replyTo && (
          <div style={{padding: '5px 15px', backgroundColor: '#F0F0F0', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E5E5E5'}}>
            <div style={{color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
               ตอบกลับ: <strong>{replyTo.text}</strong>
            </div>
            <X size={14} style={{cursor: 'pointer'}} onClick={() => setReplyTo(null)} />
          </div>
        )}
        <div style={st.inputRow}>
          <button style={st.iconBtn} onClick={(e) => { e.stopPropagation(); setShowTools(!showTools); setShowStickers(false); }}>
            {showTools ? <X size={24} color="#FFD700" /> : <Plus size={24} color="#FFD700" />}
          </button>
          
          <button style={st.iconBtn} onClick={() => handleToolAction('open_camera')}>
            <Camera size={24} color="#FFD700" />
          </button>
          
          <button style={st.iconBtn} onClick={() => handleToolAction('open_gallery')}>
            <Image size={24} color="#FFD700" />
          </button>

          <div style={{...st.inputBox, display: 'flex', alignItems: 'center', paddingRight: '10px'}}>
            <input 
              style={{...st.innerInput, flex: 1}} 
              placeholder="พิมพ์ข้อความ" 
              value={text} 
              onChange={(e)=>setText(e.target.value)} 
              onKeyPress={(e)=> e.key === 'Enter' && sendMessage()} 
            />
            <Smile 
              size={22} 
              color={showStickers ? "#FFD700" : "#999"} 
              style={{cursor: 'pointer'}} 
              onClick={(e) => { e.stopPropagation(); setShowStickers(!showStickers); setShowTools(false); }} 
            />
          </div>
          
          {text.trim() === "" ? (
            <button style={st.iconBtn} onClick={() => alert('บันทึกเสียง...')}><Mic size={24} color="#FFD700" /></button>
          ) : (
            <button style={st.iconBtn} onClick={() => sendMessage()}><Send size={24} color="#FFD700" /></button>
          )}
        </div>
        
        {showTools && <div style={{ marginTop: '10px' }}><ToolGrid onAction={handleToolAction} /></div>}
        {showStickers && <StickerPicker onSelect={(url) => sendMessage(url, 'sticker')} />}
      </div>

      {/* Sidebars & Modals */}
      {showSidebar && <NoteManager notes={notesList} onClose={() => setShowSidebar(false)} />}
      {showMedia && <MediaGalleryModal onClose={() => setShowMedia(false)} />}
      {showCalculator && <CalculatorModal onClose={() => setShowCalculator(false)} onSend={(v) => sendMessage(` ${v}`)} />}
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} onSend={(d) => sendMessage(`📅 นัดหมาย: ${d}`)} />}
      {showCreateGroup && <CreateGroupModal onClose={() => setShowCreateGroup(false)} />}
    </div>
  );
}

