import React from "react";
import "./profile.css";
import eTaxPhoto from "../../images/Group 5.png";
import Navbar from "../Navbar"; // Your existing navbar
import eTaxLogo from "../../images/eTax New logo.svg";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="profile-main">
        <div className="profile-left">
          <img
            src={eTaxPhoto}
            alt="eTaxPhoto"
            className="profile-image"
            draggable="false"
          />
        </div>

        <div className="profile-right">
          <h2 className="profile-title">الصفحة الشخصية</h2>

          <div className="profile-form">
            <div className="input-group">
              <input type="email" value="Mohamed sarhan" disabled />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input type="text" value="Mohamed@gmail.com" disabled />
              <span className="icon">📧</span>
            </div>

            <div className="input-group">
              <input type="tel" value="1232343455765435" disabled />
              <span className="icon">🪪</span>
            </div>

            <div className="input-group2">
            <input type="text" defaultValue="01092674435" />
            <span className="icon">📞</span>
            </div>

            <div className="input-group2">
            <input type="text" defaultValue="6644456546" />
            <span className="icon">🏛️</span>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="use-same-email" />
              <label htmlFor="use-same-email">استخدام نفس البريد الإلكتروني السابق للمراسلات</label>
            </div>

            <div className="login-buttons">
              <button type="submit" className="Profile-btn">إنشاء حساب جديد</button>
              <button type="button" className="Profile-register-btn">لدي حساب بالفعل</button>
            </div>

            <div className="password-section">
              <h4>تعيين كلمة مرور الجديدة</h4>
              <div className="password-fields">
                <input type="password" placeholder="كلمة المرور الحالية" />
                <input type="password" placeholder="كلمة المرور الجديدة" />
                <input type="password" placeholder="تأكيد كلمة المرور الجديدة" />
              </div>
              <button className="btn-primary full-width">تحديث كلمة المرور</button>
            </div>
          </div>
        </div>
      </div>

      <div className="Profile-footer">
        <img src={eTaxLogo} alt="eTax logo" className="Profile-etax-logo" />
        <span className="Profile-footer-text">
          جميع الحقوق محفوظة . مدعوم من
        </span>
      </div>
    </>
  );
}
