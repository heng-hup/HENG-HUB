import React, { useState, useRef, useEffect } from 'react';
import { auth, db, storage } from '../../firebase'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";

// Import จากระบบ CenterButtonSystem ของพี่
import { filterList } from './FilterData';
import { getDynamicGifts } from './GiftLogic';
import GiftModal from './GiftModal';
import LiveGridLayout from './LiveGridLayout'; 

export default function CameraOverlay({ onClose }) {
  const [activeTab, setActiveTab] = useState('video'); 
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPK, setIsPK] = useState(false); 
  const [guests, setGuests] = useState([]); 
  const [facingMode, setFacingMode] = useState("user"); 
  const [filter, setFilter] = useState('none');
  const [showFilters, setShowFilters] = useState(false);
  const [showGifts, setShowGifts] = useState(false); 
  const [giftAnim, setGiftAnim] = useState(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]); 

  // --- ระบบจัดการกล้องและของขวัญ ---
  useEffect(() => {
    startCamera();
    
    // ดักจับของขวัญแบบ Real-time (เฉพาะโหมด Live)
    const q = query(collection(db, "live_gifts"), where("timestamp", ">", new Date()));
    const unsubscribe = onSnapshot(q, (snap) => {
      snap.docChanges().forEach(change => {
        if (change.type === "added" && activeTab === 'live') { 
          const data = change.doc.data();
          setGiftAnim(data);
          setTimeout(() => setGiftAnim(null), 4000); // เคลียร์ Animation หลัง 4 วินาที
        }
      });
    });

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      unsubscribe();
    };
  }, [facingMode, activeTab]);

  const startCamera = async () => {
    try {
      if (stream) stream.getTracks().forEach(track => track.stop());
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: facingMode, width: 1280, height: 720 }, 
        audio: true 
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) { 
      console.error("Camera Error:", e);
      alert("กรุณาอนุญาตการเข้าถึงกล้อง"); 
    }
  };

  // --- Logic การทำงานของปุ่มหลัก ---
  const handleMainAction = () => {
    if (activeTab === 'photo') {
      takePhoto();
    } else if (activeTab === 'video') {
      isRecording ? stopRecording() : startRecording();
    } else if (activeTab === 'live') {
      alert("HENG HENG เริ่มถ่ายทอดสด!"); 
    }
  };

  const takePhoto = () => {
    // ลอจิกถ่ายภาพนิ่ง
    alert("บันทึกภาพนิ่งเรียบร้อย!"); 
  };

  const startRecording = () => {
    if (!stream) return;
    recordedChunks.current = [];
    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    const recorder = new MediaRecorder(stream, options);
    recorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.current.push(e.data); };
    recorder.onstop = uploadAndSaveVideo; 
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const uploadAndSaveVideo = async () => {
    if (recordedChunks.current.length === 0) return;
    // พี่นัตสามารถเพิ่มระบบอัปโหลดไป Firebase Storage ตรงนี้ได้เลยครับ
    alert("วิดีโอถูกบันทึกเรียบร้อย");
  };

  return (
    <div style={styles.overlay}>
      <style>
        {`
          @keyframes flyUp { 
            0% { transform: translate(-50%, 100vh) scale(0.5); opacity: 0; } 
            20% { opacity: 1; transform: translate(-50%, 70vh) scale(1.2); } 
            80% { opacity: 1; transform: translate(-50%, 20vh) scale(1.5); } 
            100% { transform: translate(-50%, -100vh) scale(2); opacity: 0; } 
          }
        `}
      </style>

      {/* 🎬 ส่วนจอแสดงผล (รองรับทั้ง LiveGrid และ Single View) */}
      {(activeTab === 'live' && (isPK || guests.length > 0)) ? (
        <LiveGridLayout localStream={stream} guests={guests} isPK={isPK} filter={filter} />
      ) : (
        <video ref={videoRef} autoPlay playsInline muted style={{ ...styles.preview, filter: filter }} />
      )}

      {/* 🎁 ของขวัญ (เฉพาะโหมดไลฟ์) */}
      {giftAnim && activeTab === 'live' && (
        <div style={styles.giftContainer}>
           <div style={styles.giftBadge}>🌟 {giftAnim.senderName} ส่ง {giftAnim.giftName}!</div>
           <div style={styles.giftIconFly}>{giftAnim.giftIcon}</div>
        </div>
      )}

      {/* 🛠️ เมนูด้านข้าง (Side Tools) */}
      <div style={styles.sideTools}>
        <div style={styles.tool} onClick={() => setShowFilters(!showFilters)}>✨ ฟิลเตอร์</div>
        {activeTab === 'live' && (
          <>
            <div style={styles.tool} onClick={() => setShowGifts(true)}>🎁 ของขวัญ</div>
            <div style={styles.tool} onClick={() => setIsPK(!isPK)}>
              {isPK ? '🏁 จบ PK' : '🥊 ท้า PK'}
            </div>
            <div style={styles.tool} onClick={() => setGuests([...guests, null])}>👤 ดึงเพื่อน</div>
          </>
        )}
        <div style={styles.tool} onClick={() => setFacingMode(f => f === "user" ? "environment" : "user")}>🔄 สลับกล้อง</div>
        <div style={{...styles.tool, color: '#FF3B30'}} onClick={onClose}>❌ ปิด</div>
      </div>

      {/* ✨ ถาดฟิลเตอร์ (Filter Tray) */}
      {showFilters && (
        <div style={styles.filterTray}>
          {filterList.map((f, i) => (
            <div key={i} style={styles.filterCircle} onClick={() => setFilter(f.value)}>
              <div style={{...styles.filterThumb, filter: f.value}} />
              <span style={styles.filterName}>{f.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* 🎯 ส่วนควบคุมด้านล่าง (Bottom Controls) */}
      <div style={styles.bottomSection}>
        {/* แถบเลือกโหมด */}
        <div style={styles.tabSelector}>
          {['photo', 'video', 'live'].map((mode) => (
            <span 
              key={mode}
              style={activeTab === mode ? styles.activeTab : styles.inactiveTab} 
              onClick={() => setActiveTab(mode)}
            >
              {mode === 'photo' ? 'ถ่ายภาพ' : mode === 'video' ? 'วิดีโอ' : 'ไลฟ์สด'}
            </span>
          ))}
        </div>

        <div style={styles.controls}>
          {/* ปุ่มซ้าย: คลังภาพ หรือ ตั้งค่า */}
          <div style={styles.smallBtn} onClick={() => alert(activeTab === 'live' ? "ตั้งค่าไลฟ์" : "คลังภาพ")}>
             <span>{activeTab === 'live' ? '⚙️ ตั้งค่า' : '🖼️ คลังภาพ'}</span>
          </div>

          {/* 🔴 ปุ่มกดหลัก (Record/Capture) */}
          <div style={styles.recordBtn} onClick={handleMainAction}>
             <div style={isRecording ? styles.innerSquare : styles.innerRec} />
          </div>

          {/* ปุ่มขวา: เอฟเฟกต์ */}
          <div style={styles.smallBtn} onClick={() => setShowFilters(!showFilters)}>
            <span>✨ เอฟเฟกต์</span>
          </div>
        </div>
      </div>

      {/* Modal ของขวัญ */}
      {showGifts && <GiftModal onClose={() => setShowGifts(false)} />}
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', inset: 0, background: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  sideTools: { position: 'absolute', right: '15px', top: '50px', display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 10001 },
  tool: { textAlign: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', color: '#fff', fontSize: '11px', minWidth: '70px', backdropFilter: 'blur(5px)' },
  filterTray: { position: 'absolute', bottom: '180px', width: '100%', display: 'flex', overflowX: 'auto', gap: '15px', padding: '15px', background: 'rgba(0,0,0,0.5)', zIndex: 10002, backdropFilter: 'blur(10px)' },
  filterCircle: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '65px' },
  filterThumb: { width: '45px', height: '45px', borderRadius: '50%', background: '#fff', border: '2px solid #fff', overflow: 'hidden' },
  filterName: { color: '#fff', fontSize: '10px', marginTop: '5px' },
  bottomSection: { position: 'absolute', bottom: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 10001 },
  tabSelector: { display: 'flex', gap: '25px', background: 'rgba(0,0,0,0.2)', padding: '5px 20px', borderRadius: '20px' },
  activeTab: { color: '#fff', fontWeight: 'bold', fontSize: '14px', borderBottom: '2px solid #FE2C55', paddingBottom: '5px', transition: '0.3s' },
  inactiveTab: { color: 'rgba(255,255,255,0.5)', fontSize: '14px', cursor: 'pointer' },
  controls: { width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' },
  recordBtn: { width: '75px', height: '75px', borderRadius: '50%', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  innerRec: { width: '60px', height: '60px', borderRadius: '50%', background: '#FE2C55' },
  innerSquare: { width: '30px', height: '30px', borderRadius: '4px', background: '#FE2C55' },
  smallBtn: { color: '#fff', fontSize: '12px', textAlign: 'center', minWidth: '60px', cursor: 'pointer' },
  giftContainer: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 99999 },
  giftBadge: { position: 'absolute', top: '25%', width: '100%', textAlign: 'center', color: '#fff', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontSize: '18px' },
  giftIconFly: { position: 'absolute', left: '50%', fontSize: '150px', animation: 'flyUp 4s ease-out forwards' },
};
