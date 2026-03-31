import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { styles } from '../styles/shopStyles';

// ✅ Import Component ย่อย
import CartOverlay from '../components/Shop/CartOverlay.jsx';
import CheckoutSheet from '../components/Shop/CheckoutSheet.jsx';
import AddressModal from '../components/Shop/AddressModal.jsx';

const GOOGLE_MAPS_API_KEY = "AIzaSyAXKCsxxfWlNOlaQFnG3xTqRSoLEj0aswA";

export default function Shop({ isLoggedIn }) {
  const { addToCart, cartItems, updateQty, removeFromCart } = useCart();

  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); 
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // 📌 --- ระบบ LocalStorage สำหรับโชว์เคส (ปักตะกร้า) ---
  const [pinnedProducts, setPinnedProducts] = useState([]);
  const [showShowcase, setShowShowcase] = useState(false);

  useEffect(() => {
    const savedPinned = localStorage.getItem('heng_pinned_items');
    if (savedPinned) setPinnedProducts(JSON.parse(savedPinned));
  }, []);

  useEffect(() => {
    localStorage.setItem('heng_pinned_items', JSON.stringify(pinnedProducts));
  }, [pinnedProducts]);

  // --- State ระบบเดิม (คงไว้ครบถ้วน) ---
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [shopBalance, setShopBalance] = useState(365.77); 
  const [isUsingBalance, setIsUsingBalance] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  
  const [showAddressList, setShowAddressList] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null); 
  const [addressList, setAddressList] = useState([
    { id: 1, name: 'ชัญญานุช พลยะมา', phone: '08xxxxxx61', detail: '94 ม.3 ซอยรุ่งเรืองทรัพย์ 1 ต.หนองสังข์ อ.อรัญประเทศ 27120', isDefault: true, coords: { lat: 13.69, lng: 102.50 } }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(addressList[0]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [isNewDefault, setIsNewDefault] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);

  useEffect(() => {
    const mockData = [
      { id: 1, name: 'HENG T-Shirt Premium', price: 450, comm: 45, img: '👕', sold: '1.2k' },
      { id: 2, name: 'Smart Watch Pro 2026', price: 2500, comm: 250, img: '⌚', sold: '420' },
      { id: 3, name: 'Wireless Headphones', price: 1200, comm: 120, img: '🎧', sold: '1.5k' },
      { id: 4, name: 'HENG Coffee Special', price: 320, comm: 32, img: '☕', sold: '850' },
    ];
    setProducts(mockData);
  }, [isLoggedIn]);

  // --- 🛠️ ระบบคืนเงินคืนของ (Refund Logic) ---
  const handleCancelOrder = (orderAmount) => {
    const confirmCancel = window.confirm(`ยืนยันการยกเลิก? ระบบจะคืนเงิน ฿${orderAmount} เข้า Balance ทันที`);
    if (confirmCancel) {
      setShopBalance(prev => prev + orderAmount); // คืนเงินเข้า Balance
      setToastMsg(`ยกเลิกสำเร็จ! คืนเงิน ฿${orderAmount} เรียบร้อยครับพี่นัท`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleFinalOrder = () => {
    if (isUsingBalance) {
      if (shopBalance < finalPrice) return alert("ยอดเงินใน Balance ไม่พอครับพี่นัท!");
      setShopBalance(prev => prev - finalPrice); // หักเงินจริง
    }
    
    alert('สั่งซื้อสำเร็จ! ขนส่งจะตาม GPS ไปส่งครับพี่นัท');
    setShowCheckout(false);
    selectedItems.forEach(id => removeFromCart(id));
    setSelectedItems([]);
    
    // จำลองปุ่มยกเลิกหลังจากซื้อเสร็จ (เพื่อให้พี่เห็นว่าคืนเงินได้จริง)
    setTimeout(() => {
      if(window.confirm("ต้องการยกเลิกคำสั่งซื้อเมื่อครู่เพื่อทดสอบการคืนเงินไหมครับ?")) {
        handleCancelOrder(finalPrice);
      }
    }, 1500);
  };

  // --- Handlers ทั่วไป ---
  const handleAddToCart = (p) => {
    addToCart(p);
    if (!selectedItems.includes(p.id)) setSelectedItems(prev => [...prev, p.id]);
    setToastMsg(`เพิ่ม ${p.name} ลงรถเข็นแล้ว`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleGetGPS = () => {
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentCoords({ lat: latitude, lng: longitude });
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=th&key=${GOOGLE_MAPS_API_KEY}`);
        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          const bestAddress = data.results.find(res => !res.formatted_address.includes('+')) || data.results[0];
          setNewDetail(bestAddress.formatted_address.replace(", ประเทศไทย", "").replace("Thailand", "").trim()); 
        }
      } catch (error) { setNewDetail(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`); }
      finally { setIsLoadingLocation(false); }
    }, () => { setIsLoadingLocation(false); alert("กรุณาเปิด GPS ด้วยนะพี่นัท"); });
  };

  const handleShare = async (product) => {
    const affiliateLink = `https://hengheng88.app/shop?ref=NAT_PARTNER&prod=${product.id}`;
    setPinnedProducts(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });

    if (navigator.share) await navigator.share({ title: product.name, text: `ค่าคอมสูง ฿${product.comm}`, url: affiliateLink }).catch(() => {});
    else { 
      navigator.clipboard.writeText(affiliateLink); 
      setToastMsg('คัดลอกลิงก์และปักตะกร้าสำเร็จ!'); 
      setShowToast(true); 
      setTimeout(() => setShowToast(false), 2000); 
    }
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if(code === 'HENG100') { setDiscount(100); alert('ลด 100 บาทสำเร็จ!'); }
    else if(code === 'FREESHIP') { setFreeShipping(true); alert('ส่งฟรีสำเร็จ!'); }
    else { alert('ไม่พบโค้ดนี้ครับ'); }
  };

  const handleSaveAddress = () => {
    if(!newName || !newPhone || !newDetail) return alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    const addressData = { id: editingAddressId || Date.now(), name: newName, phone: newPhone, detail: newDetail, isDefault: isNewDefault, coords: currentCoords };
    setAddressList(prev => isNewDefault ? [addressData, ...prev.map(a => ({...a, isDefault: false}))] : editingAddressId ? prev.map(a => a.id === editingAddressId ? addressData : a) : [...prev, addressData]);
    setShowAddAddressForm(false);
  };

  const calculateSubtotal = () => {
    return cartItems.filter(item => selectedItems.includes(item.id)).reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const currentTotal = selectedProduct ? selectedProduct.price : calculateSubtotal();
  const finalPrice = Math.max(0, currentTotal - discount + (freeShipping ? 0 : 35));

  return (
    <div style={styles.container}>
      {/* --- Fixed Header --- */}
      <div style={styles.fixedTop}>
        <div style={styles.topHeader}>
          <div style={styles.searchBox}><input type="text" placeholder="ค้นหาใน HENG HENG..." style={styles.searchInput} /></div>
          <div style={styles.cartBtn} onClick={() => setShowCart(true)}>
            <span style={{fontSize: '26px'}}>🛒</span>
            {cartItems.length > 0 && <div style={styles.cartBadge}>{cartItems.length}</div>}
          </div>
        </div>

        {/* 📌 แถบทางลัดเข้าสู่โชว์เคส */}
        <div 
          style={{ display: 'flex', background: '#F0FDFA', padding: '10px 16px', borderTop: '1px solid #CCFBF1', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setShowShowcase(true)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0F766E', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontSize: '10px' }}>N</div>
            <span style={{ fontSize: '13px', color: '#0F766E', fontWeight: 'bold' }}>โชว์เคสของฉัน ({pinnedProducts.length} รายการ)</span>
          </div>
          <span style={{ fontSize: '12px', color: '#0F766E' }}>จัดการ ❯</span>
        </div>

        <div style={styles.serviceGrid}>
           {[{ label: 'คำสั่งซื้อ', icon: '📝', color: '#1E40AF' }, { label: 'คืนสินค้า', icon: '🔄', color: '#475569' }, { label: 'ส่งพัสดุ', icon: '🚚', color: '#059669' }, { label: 'ช่วยเหลือ', icon: '💬', color: '#B45309' }].map((item, i) => (
             <div key={i} style={styles.serviceItem} onClick={() => alert(`ระบบ ${item.label} กำลังมาครับ`)}>
               <div style={{...styles.iconWrapper, color: item.color}}>{item.icon}</div>
               <span style={styles.serviceLabel}>{item.label}</span>
             </div>
           ))}
        </div>
      </div>

      <div style={{ height: '225px' }} />

      {/* --- Product Grid --- */}
      <div style={styles.productGrid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <div style={styles.imgArea}>
              <span style={styles.prodEmoji}>{p.img}</span>
              <div style={styles.commBadge}>คอม ฿{p.comm}</div>
              <div style={styles.soldBadgeTop}>ขายแล้ว {p.sold}</div>
              <div style={styles.shareIconBtn} onClick={() => handleShare(p)}>🔗</div>
            </div>
            <div style={styles.infoArea}>
              <div style={styles.prodName}>{p.name}</div>
              <div style={styles.priceRow}>
                <span style={styles.currency}>฿</span>
                <span style={styles.priceAmount}>{p.price.toLocaleString()}</span>
              </div>
              <div style={styles.btnRow}>
                <button style={styles.addCartBtn} onClick={() => handleAddToCart(p)}>+ รถเข็น</button>
                <button style={styles.buyNowBtn} onClick={() => { setSelectedProduct(p); setShowCheckout(true); }}>ซื้อเลย</button>
              </div>
              <button style={styles.affiliateBtn} onClick={() => handleShare(p)}>📌 ปักตะกร้าสร้างรายได้</button>
            </div>
          </div>
        ))}
      </div>

      {/* --- UI Overlays --- */}
      <CartOverlay 
        showCart={showCart} setShowCart={setShowCart} cartItems={cartItems}
        selectedItems={selectedItems} toggleSelectItem={(id) => setSelectedItems(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id])}
        updateQty={updateQty} removeFromCart={removeFromCart} calculateSubtotal={calculateSubtotal}
        selectedAddress={selectedAddress} setShowAddressList={setShowAddressList}
        onFinalOrder={() => { setSelectedProduct(null); setShowCheckout(true); setShowCart(false); }}
      />

      <CheckoutSheet 
        showCheckout={showCheckout} setShowCheckout={setShowCheckout} selectedAddress={selectedAddress}
        setShowAddressList={setShowAddressList} couponCode={couponCode} setCouponCode={setCouponCode}
        applyCoupon={applyCoupon} currentTotal={currentTotal} discount={discount}
        freeShipping={freeShipping} shopBalance={shopBalance} isUsingBalance={isUsingBalance}
        setIsUsingBalance={setIsUsingBalance} finalPrice={finalPrice} onFinalOrder={handleFinalOrder}
      />

      <AddressModal 
        showAddressList={showAddressList} setShowAddressList={setShowAddressList} addressList={addressList}
        selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} setEditingAddressId={setEditingAddressId}
        setShowAddAddressForm={setShowAddAddressForm} showAddAddressForm={showAddAddressForm} currentCoords={currentCoords}
        GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY} handleGetGPS={handleGetGPS} isLoadingLocation={isLoadingLocation}
        newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone}
        newDetail={newDetail} setNewDetail={setNewDetail} handleSaveAddress={handleSaveAddress}
      />

      {/* 📌 หน้า Showcase */}
      {showShowcase && (
        <div style={styles.checkoutOverlay} onClick={() => setShowShowcase(false)}>
          <div style={{ ...styles.checkoutSheet, height: '85%' }} onClick={e => e.stopPropagation()}>
            <div style={{ ...styles.checkoutHeader, background: '#0F766E', color: '#FFF' }}>
              <div onClick={() => setShowShowcase(false)} style={{ cursor: 'pointer', padding: '10px' }}>✕</div>
              <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>โชว์เคสสร้างรายได้</div>
              <div style={{ width: '40px' }} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
              {pinnedProducts.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#94A3B8' }}>ยังไม่มีสินค้าในโชว์เคสครับ</div>
              ) : (
                pinnedProducts.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #F1F5F9', gap: '12px' }}>
                    <div style={{ fontSize: '30px', background: '#F8FAFC', padding: '8px', borderRadius: '8px' }}>{item.img}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>{item.name}</div>
                      <div style={{ fontSize: '13px', color: '#0F766E' }}>ค่าคอมมิชชัน ฿{item.comm}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <button onClick={() => handleShare(item)} style={{ padding: '6px 12px', background: '#0F766E', color: '#FFF', border: 'none', borderRadius: '5px', fontSize: '12px' }}>แชร์ลิงก์</button>
                      <button onClick={() => setPinnedProducts(prev => prev.filter(p => p.id !== item.id))} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '11px' }}>ลบสินค้า</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '20px', textAlign: 'center', fontSize: '11px', color: '#94A3B8', borderTop: '1px solid #F1F5F9' }}>
              Balance ปัจจุบัน: ฿{shopBalance.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {showToast && <div style={styles.toast}>{toastMsg}</div>}
      <div style={{ height: '100px' }} />
    </div>
  );
}

