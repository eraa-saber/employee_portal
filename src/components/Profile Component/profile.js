import React, { useEffect, useState } from "react";
import "./profile.css";
import eTaxPhoto from "../../images/Group 5.png";
import Navbar from "../Navbar";
import eTaxLogo from "../../images/eTax New logo.svg";

import PersonIcon from "../../images/Icon material-person-outline.svg";
import MailIcon from "../../images/Icon feather-mail.svg";
import IDIcon from "../../images/Icon awesome-address-card.svg";
import PhoneIcon from "../../images/Icon feather-phone.svg";
import InsuranceIcon from "../../images/insurance.svg";

import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState(""); // ✅ ADDED
  const [insuranceNo, setInsuranceNo] = useState(""); // ✅ ADDED
  const [message, setMessage] = useState(""); // ✅ ADDED

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/api/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setPhone(response.data.phone); // ✅ Set initial phone
        setInsuranceNo(response.data.insurranceNo); // ✅ Set initial insurance number
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleReset = () => {
  setPhone("");
  setInsuranceNo("");
  setMessage("");
};


  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.put(
        "http://127.0.0.1:8000/api/update-profile",
        {
          phone: phone,
          insurranceNo: insuranceNo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ تم تحديث البيانات بنجاح");
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("❌ حدث خطأ أثناء تحديث البيانات");
    }
  };

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
              <input type="text" value={user?.fullName || ""} disabled />
              <img src={PersonIcon} alt="person" className="icon" />
            </div>

            <div className="input-group">
              <input type="email" value={user?.email || ""} disabled />
              <img src={MailIcon} alt="mail" className="icon" />
            </div>

            <div className="input-group">
              <input type="tel" value={user?.nationalID || ""} disabled />
              <img src={IDIcon} alt="ID" className="icon" />
            </div>

            <div className="input-group2">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // ✅ UPDATED
              />
              <img src={PhoneIcon} alt="phone" className="icon" />
            </div>

            <div className="input-group2">
              <input
                type="text"
                value={insuranceNo}
                onChange={(e) => setInsuranceNo(e.target.value)} // ✅ UPDATED
              />
              <img src={InsuranceIcon} alt="insurance" className="icon" />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="use-same-email" />
              <label htmlFor="use-same-email">
                استخدام نفس البريد الإلكتروني السابق للمراسلات
              </label>
            </div>

            {message && (
            <div
                className={`update-message ${
                message.startsWith("✅") ? "success" : "error"
                }`}
            >
                {message}
            </div>
            )}


            <div className="login-buttons">
              <button type="button" className="Profile-btn" onClick={handleUpdate}>
                تحديث البيانات
              </button>
                <button type="button" className="Profile-register-btn" onClick={handleReset}>
                إعادة إدخال
                </button>
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
        <span className="Profile-footer-text">جميع الحقوق محفوظة . مدعوم من</span>
      </div>
    </>
  );
}
