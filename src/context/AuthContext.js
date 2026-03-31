import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]); // เก็บได้ 7-8 บัญชี

  // 1. ดึงบัญชีทั้งหมดที่เคย Login ในเครื่องนี้ขึ้นมา
  useEffect(() => {
    const savedAccounts = JSON.parse(localStorage.getItem('heng_accounts')) || [];
    setAllAccounts(savedAccounts);
    
    // ตั้งค่าบัญชีล่าสุดที่ใช้งาน
    const lastUser = JSON.parse(localStorage.getItem('current_heng_user'));
    if (lastUser) setCurrentUser(lastUser);
  }, []);

  // 2. ฟังก์ชันเพิ่มบัญชีใหม่ (ตอนสมัคร/Login อีเมล)
  const addAccount = (newUserData) => {
    const updatedAccounts = [...allAccounts.filter(acc => acc.id !== newUserData.id), newUserData];
    if (updatedAccounts.length > 8) {
      alert("จำกัดไม่เกิน 8 บัญชีต่อเครื่องครับพี่นัท");
      return;
    }
    setAllAccounts(updatedAccounts);
    setCurrentUser(newUserData);
    localStorage.setItem('heng_accounts', JSON.stringify(updatedAccounts));
    localStorage.setItem('current_heng_user', JSON.stringify(newUserData));
  };

  // 3. ฟังก์ชันสลับบัญชี
  const switchAccount = (userId) => {
    const targetUser = allAccounts.find(acc => acc.id === userId);
    setCurrentUser(targetUser);
    localStorage.setItem('current_heng_user', JSON.stringify(targetUser));
  };

  return (
    <AuthContext.Provider value={{ currentUser, allAccounts, addAccount, switchAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
