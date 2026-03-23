import React from 'react';
import { Camera, Image, Plus, Smile, Mic, Send, X } from 'lucide-react';
import { st } from '../styles/chatStyles';

export default function ChatFooter({ 
  text, setText, sendMessage, showTools, setShowTools, 
  setShowMedia, replyTo, setReplyTo 
}) {
  return (
    <div style={{...st.footer, height: showTools ? '260px' : (replyTo ? '130px' : '90px')}}>
      {replyTo && (
        <div style={{padding: '5px 15px', backgroundColor: '#F0F0F0', fontSize: '12px', display: 'flex', justifyContent: 'space-between'}}>
          <span>ตอบกลับ: {replyTo.text}</span>
          <X size={14} onClick={() => setReplyTo(null)} style={{cursor: 'pointer'}} />
        </div>
      )}

      <div style={st.inputRow}>
        <button style={st.iconBtn} onClick={() => setShowTools(!showTools)}>
          {showTools ? <X size={24} /> : <Plus size={24} />}
        </button>

        <button style={st.iconBtn} onClick={() => alert('เปิดกล้อง')}>
          <Camera size={24} />
        </button>

        <button style={st.iconBtn} onClick={() => setShowMedia(true)}>
          <Image size={24} />
        </button>

        <div style={st.inputBox}>
          <input 
            style={st.innerInput} 
            placeholder="พิมพ์ข้อความ" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
          />
          <button style={st.stickerBtnInside} onClick={() => setText(prev => prev + "😊")}>
            <Smile size={22} color="#999" />
          </button>
        </div>
        
        <button 
          style={st.iconBtn} 
          onClick={() => text.trim() ? sendMessage() : alert('เริ่มบันทึกเสียง')}
        >
          {text.trim() === "" ? <Mic size={24} /> : <Send size={24} />}
        </button>
      </div>
    </div>
  );
}
