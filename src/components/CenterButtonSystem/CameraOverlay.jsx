import React, { useState, useRef, useEffect } from 'react';
import { LiveKitRoom, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { AccessToken } from 'livekit-server-sdk';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

// 📍 ข้อมูลระบบภายใน
const GIFT_LIST = [
  { id: 1, name: 'หัวใจ', price: 10, icon: '❤️' },
  { id: 2, name: 'กุหลาบ', price: 50, icon: '🌹' },
  { id: 3, name: 'รถสปอร์ต', price: 1000, icon: '🏎️' }
];

const FILTERS = [
  { id: 'none', name: 'ปกติ', value: 'none' },
  { id: 'bright', name: 'สว่าง', value: 'brightness(1.2) contrast(1.1)' },
  { id: 'pink', name: 'ชมพู', value: 'sepia(0.3) hue-rotate(-30deg) saturate(1.4)' }
];

export default function CameraOverlay({ onClose, onNavigateToPost }) { 
  const [activeTab, setActiveTab] = useState('LIVE'); 
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState('none');
  const [showFilters, setShowFilters] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState(null); 

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // 1. เปิดกล้องทันที
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(s => { if (videoRef.current) videoRef.current.srcObject = s; })
      .catch(e => alert("กรุณาอนุญาตกล้องและไมค์ครับ"));
  }, []);

  // 2. ระบบนับเวลาอัด
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } else {
      clearInterval(timer);
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // 3. ฟังก์ชัน Shutter รวมร่าง
  const handleShutter = async () => {
    if (activeTab === 'LIVE') {
      const at = new AccessToken('APIgReK3QiRxggr', '12pwJIgxkOLEqb3sGvomSjYvH8mVkJ5dKL4aMTnx3bP', { identity: 'Host_Nat' });
      at.addGrant({ roomJoin: true, room: 'HengRoom', canPublish: true });
      setToken(await at.toJwt());
      setIsLive(true);
    } else if (activeTab === 'ถ่ายภาพ') {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.filter = filter; // ใส่ฟิลเตอร์ลงในรูปที่ถ่ายด้วย
      ctx.drawImage(videoRef.current, 0, 0);
      setCapturedMedia(canvas.toDataURL('image/jpeg'));
      alert("📸 ถ่ายภาพสำเร็จ!");
    } else {
      if (isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      } else {
        chunksRef.current = [];
        const recorder = new MediaRecorder(videoRef.current.srcObject);
        recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          setCapturedMedia(URL.createObjectURL(blob));
          alert("🎥 บันทึกวิดีโอสำเร็จ!");
        };
        recorder.start();
        setIsRecording(true);
      }
    }
  };

  const handlePost = () => {
    if (!capturedMedia) return alert("กรุณาถ่ายภาพหรือวิดีโอก่อนโพสต์ครับ");
    onNavigateToPost(capturedMedia);
  };

  if (isLive && token) {
    return (
      <div style={styles.fullScreen}>
        <LiveKitRoom token={token} serverUrl="wss://hengheng-app-u9uv9u9s.livekit.cloud" connect={true}>
           <LiveLayout onLeave={() => setIsLive(false)} filter={filter} />
        </LiveKitRoom>
      </div>
    );
  }

  return (
    <div style={styles.fullScreen}>
      <video ref={videoRef} autoPlay playsInline style={{...styles.video, filter}} />
      
      {/* 🛠 เครื่องมือด้านข้าง: ฟิลเตอร์ & เติมเงิน TrueMoney */}
      <div style={styles.sideTools}>
        <div onClick={() => setShowFilters(!showFilters)} style={styles.toolBtn}>✨<br/><span style={{fontSize: 10}}>ฟิลเตอร์</span></div>
        <div onClick={() => window.open('https://www.truemoney.com/', '_blank')} style={styles.toolBtn}>💰<br/><span style={{fontSize: 10}}>เติมเหรียญ</span></div>
      </div>

      <div style={styles.topUI}>
        <div onClick={onClose} style={styles.closeBtn}>✕</div>
        {isRecording && <div style={styles.timer}>{recordingTime}s</div>}
      </div>

      <div style={styles.bottomUI}>
        {showFilters && (
          <div style={styles.tray}>
            {FILTERS.map(f => (
              <div key={f.id} onClick={() => { setFilter(f.value); setShowFilters(false); }} style={styles.item}>{f.name}</div>
            ))}
          </div>
        )}

        <div style={styles.tabBar}>
          {['ถ่ายภาพ', '15 วินาที', '60 วินาที', 'LIVE'].map(t => (
            <span key={t} onClick={() => setActiveTab(t)} 
              style={activeTab === t ? styles.tabActive : styles.tabInactive}>
              {t}
            </span>
          ))}
        </div>

        <div style={styles.shutterRow}>
           <div style={{width: 50}} />
           <div onClick={handleShutter} style={styles.shutterOuter}>
              <div style={{
                ...styles.shutterInner, 
                backgroundColor: activeTab === 'LIVE' ? '#fff' : '#ff4d4d',
                borderRadius: isRecording ? '8px' : '50%'
              }} />
           </div>
           <div onClick={handlePost} style={{...styles.postBtn, opacity: capturedMedia ? 1 : 0.5}}>
              <span>📤</span>
              <p style={{fontSize: 10, margin: 0}}>โพสต์</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function LiveLayout({ onLeave, filter }) {
  const [showGifts, setShowGifts] = useState(false);
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }]);
  return (
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <VideoTrack trackRef={tracks[0]} style={{width: '100%', height: '100%', objectFit: 'cover', filter}} />
      <div style={styles.liveOverlayUI}>
         <div style={styles.liveBadge}>LIVE</div>
         <div style={{display: 'flex', gap: 15}}>
            <div onClick={() => setShowGifts(!showGifts)} style={styles.giftBtnIcon}>🎁</div>
            <div onClick={onLeave} style={styles.exitBtn}>จบไลฟ์</div>
         </div>
      </div>

      {showGifts && (
        <div style={styles.giftTray}>
          {GIFT_LIST.map(g => (
            <div key={g.id} style={styles.giftItem} onClick={() => { alert(`ส่ง ${g.name} แล้ว!`); setShowGifts(false); }}>
              <span style={{fontSize: 30}}>{g.icon}</span>
              <p style={{fontSize: 12, margin: 0}}>{g.price}฿</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  fullScreen: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 999999 },
  video: { width: '100%', height: '100%', objectFit: 'cover' },
  topUI: { position: 'absolute', top: 40, width: '100%', padding: '0 20px', display: 'flex', justifyContent: 'space-between', zIndex: 10 },
  closeBtn: { fontSize: 32, color: '#fff', cursor: 'pointer' },
  timer: { backgroundColor: '#ff4d4d', padding: '5px 15px', borderRadius: 20, color: '#fff', fontWeight: 'bold' },
  sideTools: { position: 'absolute', right: 20, top: 100, display: 'flex', flexDirection: 'column', gap: 20, zIndex: 10 },
  toolBtn: { textAlign: 'center', color: '#fff', fontSize: 24, cursor: 'pointer', background: 'rgba(0,0,0,0.4)', padding: 10, borderRadius: 10 },
  bottomUI: { position: 'absolute', bottom: 40, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 },
  tray: { display: 'flex', gap: 15, background: 'rgba(0,0,0,0.8)', padding: '15px 25px', borderRadius: 25, marginBottom: 20 },
  item: { color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 'bold' },
  tabBar: { display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, color: '#fff' },
  tabActive: { fontWeight: 'bold', borderBottom: '2px solid #fff', paddingBottom: 5 },
  tabInactive: { opacity: 0.6 },
  shutterRow: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 },
  shutterOuter: { width: 80, height: 80, borderRadius: '50%', border: '4px solid #fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
  shutterInner: { width: 62, height: 62, transition: 'all 0.2s' },
  postBtn: { textAlign: 'center', color: '#fff', cursor: 'pointer' },
  liveOverlayUI: { position: 'absolute', top: 40, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  liveBadge: { backgroundColor: '#ff4d4d', color: '#fff', padding: '5px 10px', borderRadius: 5, fontWeight: 'bold' },
  giftBtnIcon: { fontSize: 30, cursor: 'pointer' },
  exitBtn: { backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', padding: '5px 15px', borderRadius: 20, cursor: 'pointer' },
  giftTray: { position: 'absolute', bottom: 50, width: '90%', left: '5%', display: 'flex', justifyContent: 'space-around', background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: 20 },
  giftItem: { textAlign: 'center', color: '#fff', cursor: 'pointer' }
};
