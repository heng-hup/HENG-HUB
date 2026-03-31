import React, { useMemo } from 'react';
import { useAffiliate } from '../hooks/useAffiliate';

export default function Dashboard() {
  const { pinnedItems, isLoading } = useAffiliate('NAT_01');

  // --- 1. คำนวณยอดสรุป (Logic) ---
  const stats = useMemo(() => {
    const totalItems = pinnedItems.length;
    // จำลองยอดขายเฉลี่ย (ในระบบจริงจะดึงจาก Collection 'orders')
    const potentialComm = pinnedItems.reduce((sum, item) => sum + (item.variants[0].comm || 0), 0);
    
    return {
      count: totalItems,
      potential: potentialComm,
      soldCount: 12, // ค่าจำลอง
      actualIncome: potentialComm * 5 // ค่าจำลอง
    };
  }, [pinnedItems]);

  if (isLoading) return <div style={styles.loading}>กำลังโหลดข้อมูล...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💰 แผงควบคุมรายได้</h2>

      {/* สรุปยอดเงิน */}
      <div style={styles.cardMain}>
        <div style={styles.label}>รายได้รวมทั้งหมด</div>
        <div style={styles.incomeText}>฿{stats.actualIncome.toLocaleString()}</div>
        <div style={styles.subLabel}>อัปเดตล่าสุด: วันนี้</div>
      </div>

      {/* สถิติรายย่อย */}
      <div style={styles.statsGrid}>
        <div style={styles.statBox}>
          <div style={styles.statVal}>{stats.count}</div>
          <div style={styles.statLabel}>สินค้าในช่อง</div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statVal}>{stats.soldCount}</div>
          <div style={styles.statLabel}>ออเดอร์ที่ขายได้</div>
        </div>
      </div>

      {/* รายการสินค้าที่ทำกำไรดีที่สุด */}
      <h3 style={styles.sectionTitle}>สินค้าที่ปักตะกร้าไว้</h3>
      <div style={styles.itemList}>
        {pinnedItems.map(item => (
          <div key={item.id} style={styles.itemRow}>
            <span style={{fontSize: '24px'}}>{item.img}</span>
            <div style={{flex: 1, marginLeft: '12px'}}>
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemDetail}>ค่าคอมสูงสุด: ฿{Math.max(...item.variants.map(v => v.comm))}</div>
            </div>
            <div style={styles.itemBadge}>พร้อมขาย</div>
          </div>
        ))}
        {pinnedItems.length === 0 && (
          <div style={styles.empty}>ยังไม่มีสินค้าที่ปักไว้ครับพี่นัท</div>
        )}
      </div>

      <button style={styles.withdrawBtn}>ถอนรายได้เข้า HENG Wallet</button>
    </div>
  );
}

const styles = {
  container: { padding: '20px', background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" },
  header: { fontSize: '22px', color: '#1E293B', marginBottom: '20px' },
  cardMain: { background: 'linear-gradient(135deg, #BE123C 0%, #E11D48 100%)', padding: '25px', borderRadius: '16px', color: '#FFF', textAlign: 'center', boxShadow: '0 10px 20px rgba(190, 12, 60, 0.2)', marginBottom: '20px' },
  incomeText: { fontSize: '36px', fontWeight: 'bold', margin: '10px 0' },
  label: { fontSize: '14px', opacity: 0.9 },
  subLabel: { fontSize: '11px', opacity: 0.7 },
  statsGrid: { display: 'flex', gap: '12px', marginBottom: '25px' },
  statBox: { flex: 1, background: '#FFF', padding: '15px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0' },
  statVal: { fontSize: '20px', fontWeight: 'bold', color: '#BE123C' },
  statLabel: { fontSize: '11px', color: '#64748B', marginTop: '4px' },
  sectionTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px' },
  itemList: { background: '#FFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' },
  itemRow: { display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #F1F5F9' },
  itemName: { fontSize: '14px', fontWeight: '500' },
  itemDetail: { fontSize: '12px', color: '#94A3B8' },
  itemBadge: { fontSize: '10px', color: '#059669', background: '#DCFCE7', padding: '2px 8px', borderRadius: '10px' },
  withdrawBtn: { width: '100%', marginTop: '30px', padding: '15px', borderRadius: '12px', border: 'none', background: '#1E293B', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' },
  empty: { textAlign: 'center', padding: '30px', color: '#94A3B8', fontSize: '14px' },
  loading: { textAlign: 'center', marginTop: '50px', color: '#64748B' }
};
