import React from 'react';
import { LiveKitRoom, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';

export default function LivePage() {
  // สมมติว่านี่คือ Token สำหรับคนที่จะเข้ามา "ดู" (Viewer)
  // ในใช้งานจริง พี่ต้องดึง Token มาจาก Backend หรือ Firebase
  const viewerToken = ""; // ใส่ Token สำหรับคนดูที่นี่

  if (!viewerToken) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <span>📺</span>
          <p>ตอนนี้ยังไม่มีใครไลฟ์สดครับพี่นัต</p>
          <button style={styles.refreshBtn} onClick={() => window.location.reload()}>รีเฟรชหน้าจอ</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <LiveKitRoom
        token={viewerToken}
        serverUrl="wss://hengheng-app-u9uv9u9s.livekit.cloud"
        connect={true}
      >
        <LiveFeedView />
      </LiveKitRoom>
    </div>
  );
}

function LiveFeedView() {
  // ดึงเฉพาะ Video ของคนที่กำลังไลฟ์อยู่มาโชว์
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }]);

  return (
    <div style={styles.feedWrapper}>
      {tracks.length > 0 ? (
        <VideoTrack trackRef={tracks[0]} style={styles.mainVideo} />
      ) : (
        <div style={styles.loading}>กำลังเชื่อมต่อสัญญาณสด...</div>
      )}
      
      {/* Overlay สำหรับคนดู (TikTok Style) */}
      <div style={styles.viewerUI}>
        <div style={styles.hostInfo}>
          <div style={styles.avatar}>H</div>
          <span>HENG HENG LIVE</span>
        </div>
        <div style={styles.giftBtn} onClick={() => alert("ส่งของขวัญ")}>🎁</div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100vh', backgroundColor: '#000', color: '#fff' },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '15px' },
  refreshBtn: { backgroundColor: '#F2D06B', color: '#00338D', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold' },
  feedWrapper: { position: 'relative', width: '100%', height: '100%' },
  mainVideo: { width: '100%', height: '100%', objectFit: 'cover' },
  viewerUI: { position: 'absolute', bottom: 80, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  hostInfo: { display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.4)', padding: '5px 15px', borderRadius: '25px' },
  avatar: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#00338D', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  giftBtn: { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }
};
