import React, { useState, useRef, useEffect } from 'react';
import { db } from '../../firebase'; 
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { filterList } from './FilterData'; 
import GiftModal from './GiftModal';

export default function CameraOverlay({ onClose, onNavigateToPost }) { 
  const [activeTab, setActiveTab] = useState('15 วินาที'); 
  const [stream, setStream] = useState(null);
  const [filter, setFilter] = useState('none');
  const [showFilters, setShowFilters] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null); 

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null); 
  const chunksRef = useRef([]);

  const getMaxSeconds = () => {
    if (activeTab === '10 นาที') return 10 * 60;
    if (activeTab === '60 วินาที') return 60;
    if (activeTab === '15 วินาที') return 15;
    return 0; 
  };

  // --- ระบบ Timer (ใช้เงื่อนไข .includes เหมือนสคริปต์ที่พี่ส่งมาเพื่อให้วิ่งชัวร์) ---
  useEffect(() => {
    let timer;
    const isVideoMode = activeTab.includes('วินาที') || activeTab.includes('นาที');

    if (isRecording && isVideoMode) {
      timer = setInterval(() => {
        setRecordingTime(prev => {
          const nextTime = prev + 1;
          const maxSecs = getMaxSeconds();
          if (nextTime >= maxSecs) {
            stopRecording();
            return maxSecs;
          }
          return nextTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording, activeTab]);

  // --- ฟังก์ชันอัดวิดีโอจริง ---
  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    
    // ตั้งค่า Recorder
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setSelectedMedia(videoURL); // เก็บผลลัพธ์วิดีโอไว้โพสต์
      alert(`🎥 บันทึกวิดีโอ ${activeTab} เรียบร้อย!`);
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.filter = filter;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL('image/jpeg');
      setSelectedMedia(imageBase64); 
      alert("📸 ถ่ายภาพ HENG HENG เรียบร้อย!");
    }
  };

  const handleShutter = () => {
    if (activeTab === 'ถ่ายภาพ') {
      takePhoto();
    } else if (activeTab === 'ไลฟ์สด') {
      alert("📡 เริ่มสตรีมสด!");
    } else {
      if (isRecording) {
        stopRecording();
      } else {
        setRecordingTime(0); 
        startRecording(); // เรียกฟังก์ชันอัดจริง
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedMedia(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!selectedMedia) {
      alert("กรุณาเลือกรูปหรือถ่ายภาพก่อนครับพี่นัท");
      return;
    }
    if (onNavigateToPost) {
        onNavigateToPost(selectedMedia);
    } else {
        console.log("Media Data:", selectedMedia);
        alert("🚀 พร้อมส่งข้อมูลไปหน้าโพสต์!");
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (stream) stream.getTracks().forEach(track => track.stop());
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode, width: 1280, height: 720 }, audio: true 
        });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (e) { console.log("Camera access denied"); }
    };
    startCamera();
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [facingMode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = getMaxSeconds() > 0 ? (recordingTime / getMaxSeconds()) * 100 : 0;

  return (
    <div style={styles.overlay}>
      <video ref={videoRef} autoPlay playsInline style={{ ...styles.preview, filter: filter }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*,video/*" onChange={handleFileSelect} />

      <div style={styles.topHeader}>
        <div style={styles.closeBtn} onClick={onClose}>✕</div>
        <div style={styles.centerTop}>
          {isRecording ? (
            <div style={styles.timerBadge}>
              <span style={styles.redDot}>●</span> {formatTime(recordingTime)} / {formatTime(getMaxSeconds())}
            </div>
          ) : (
            <div style={styles.musicBtn} onClick={() => alert("เลือกเพลง")}>🎵 เพิ่มเสียง</div>
          )}
        </div>
        <div style={{width: '30px'}} /> 
      </div>

      {!isRecording && (
        <div style={styles.sideTools}>
          <div style={styles.toolItem} onClick={() => setFacingMode(f => f === "user" ? "environment" : "user")}>
            <span style={styles.iconCircle}>🔄</span>
            <span style={styles.toolLabel}>พลิก</span>
          </div>
          <div style={styles.toolItem} onClick={() => setShowFilters(!showFilters)}>
            <span style={styles.iconCircle}>✨</span>
            <span style={styles.toolLabel}>ฟิลเตอร์</span>
          </div>
          {activeTab === 'ไลฟ์สด' && (
            <div style={styles.toolItem} onClick={() => setShowGifts(true)}>
              <span style={styles.iconCircle}>🎁</span>
              <span style={styles.toolLabel}>ของขวัญ</span>
            </div>
          )}
          <div style={styles.toolItem} onClick={() => alert("ตั้งค่า")}>
            <span style={styles.iconCircle}>⚙️</span>
            <span style={styles.toolLabel}>ตั้งค่า</span>
          </div>
        </div>
      )}

      {showFilters && !isRecording && (
        <div style={styles.filterTray}>
          {filterList.map((f) => (
            <div key={f.id} style={styles.filterCircle} onClick={() => setFilter(f.value)}>
              <div style={{...styles.filterThumb, filter: f.value, backgroundImage: `url(${f.thumb})`, backgroundSize: 'cover'}} />
              <span style={{fontSize: '9px', color: '#fff'}}>{f.name}</span>
            </div>
          ))}
        </div>
      )}

      <div style={styles.bottomArea}>
        {!isRecording && (
          <div style={styles.tabSelector}>
            {['10 นาที', '60 วินาที', '15 วินาที', 'ถ่ายภาพ', 'ไลฟ์สด'].map((tab) => (
              <span key={tab} onClick={() => setActiveTab(tab)} style={activeTab === tab ? styles.tabActive : styles.tabInactive}>
                {tab}
              </span>
            ))}
          </div>
        )}

        <div style={styles.shutterRow}>
          <div style={{...styles.subBtn, opacity: isRecording ? 0 : 1}} onClick={() => fileInputRef.current.click()}>
            <div style={{
              ...styles.galleryPreview,
              backgroundImage: selectedMedia ? (selectedMedia.startsWith('blob:') ? 'none' : `url(${selectedMedia})`) : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: selectedMedia ? '#ff4d4d' : 'rgba(255,255,255,0.2)'
            }}>
                {selectedMedia && selectedMedia.startsWith('blob:') && <span style={{fontSize: '10px'}}>VIDEO</span>}
            </div>
            <span style={styles.subBtnText}>คลังภาพ</span>
          </div>

          <div style={styles.shutterOuter} onClick={handleShutter}>
             {isRecording && (
               <svg style={styles.progressSvg}>
                 <circle cx="41" cy="41" r="38" stroke="#ff4d4d" strokeWidth="5" fill="none" 
                   strokeDasharray={238} strokeDashoffset={238 - (238 * progressPercent) / 100} 
                   strokeLinecap="round" style={{transition: 'stroke-dashoffset 1s linear'}}
                 />
               </svg>
             )}
            <div style={{
              ...styles.shutterInner,
              backgroundColor: activeTab === 'ไลฟ์สด' ? '#fff' : '#ff4d4d',
              borderRadius: isRecording ? '8px' : '50%',
              transform: isRecording ? 'scale(0.5)' : 'scale(1)',
              transition: 'all 0.2s'
            }} />
          </div>

          <div style={{...styles.subBtn, opacity: (isRecording || !selectedMedia) ? 0.5 : 1}} onClick={handlePost}>
            <div style={styles.fbPostBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </div>
            <span style={{...styles.subBtnText, color: '#1877F2', fontWeight: 'bold'}}>โพสต์</span>
          </div>
        </div>
      </div>

      {showGifts && <GiftModal onClose={() => setShowGifts(false)} />}
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', inset: 0, background: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column', color: '#fff', overflow: 'hidden', fontFamily: 'sans-serif' },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  topHeader: { position: 'absolute', top: '40px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', zIndex: 10 },
  closeBtn: { fontSize: '26px', cursor: 'pointer', textShadow: '0 0 4px #000' },
  centerTop: { display: 'flex', alignItems: 'center' },
  musicBtn: { background: 'rgba(0,0,0,0.4)', padding: '6px 15px', borderRadius: '20px', fontSize: '13px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.2)' },
  timerBadge: { background: 'rgba(255,0,0,0.7)', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center' },
  redDot: { color: '#fff', animation: 'blink 1s infinite', marginRight: '6px' },
  sideTools: { position: 'absolute', right: '12px', top: '100px', display: 'flex', flexDirection: 'column', gap: '18px', zIndex: 10 },
  toolItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' },
  iconCircle: { fontSize: '24px', textShadow: '0 0 4px #000' },
  toolLabel: { fontSize: '11px', textShadow: '0 0 2px #000', fontWeight: '500' },
  bottomArea: { position: 'absolute', bottom: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', zIndex: 10 },
  tabSelector: { display: 'flex', gap: '20px', fontSize: '14px', fontWeight: 'bold', textShadow: '0 0 4px #000', width: '100%', justifyContent: 'center', overflowX: 'auto', padding: '10px 0' },
  tabActive: { color: '#fff', borderBottom: '2px solid #fff', paddingBottom: '6px', whiteSpace: 'nowrap' },
  tabInactive: { color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' },
  shutterRow: { width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 30px' },
  shutterOuter: { position: 'relative', width: '82px', height: '82px', borderRadius: '50%', border: '5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  shutterInner: { width: '66px', height: '66px', transition: 'all 0.2s' },
  progressSvg: { position: 'absolute', width: '82px', height: '82px', transform: 'rotate(-90deg)', pointerEvents: 'none' },
  subBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'opacity 0.3s' },
  subBtnText: { fontSize: '12px', textShadow: '0 0 4px #000' },
  galleryPreview: { width: '42px', height: '42px', borderRadius: '8px', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  fbPostBtn: { width: '45px', height: '45px', borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '2px solid #fff' },
  filterTray: { position: 'absolute', bottom: '220px', width: '100%', display: 'flex', overflowX: 'auto', gap: '15px', padding: '15px', background: 'rgba(0,0,0,0.5)' },
  filterCircle: { minWidth: '65px', textAlign: 'center' },
  filterThumb: { width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #fff', marginBottom: '6px' },
};

