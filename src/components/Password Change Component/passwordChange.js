import React, { useState } from "react";
import "./passwordChange.css";
import leftImage from "../../images/Group 13.png";
import combinedLogo from "../../images/Group 131.png";
import eTaxLogo from "../../images/eTax New logo.svg";
import api from "../../api";
import { useLocation, useNavigate } from 'react-router-dom';

const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // Get email from resetEmail in localStorage, or from logged-in user
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const email = localStorage.getItem('resetEmail') || (user.email || "");

  // Extract token from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    console.log('handleSubmit called');
    console.log('email:', email);
    console.log('password:', password);
    console.log('confirmPassword:', confirmPassword);
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (!email) {
      setError("لا يوجد بريد إلكتروني محدد.");
      return;
    }
    if (!token) {
      setError("رمز إعادة تعيين كلمة المرور مفقود.");
      return;
    }
    try {
      console.log('Sending API request...');
      const response = await api.post("/change-password", { email, password, password_confirmation: confirmPassword, token });
      setMessage("تم تغيير كلمة المرور بنجاح.");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("حدث خطأ. حاول مرة أخرى.");
      }
    }
  };

  return (
    <div className="resetpassword-root">
      <div className="resetpassword-container ">
        <div className="resetpassword-image-section no-clip">
          <img
            src={leftImage}
            alt="login visual"
            className="resetpassword-image-full no-mirror"
            draggable="false"
          />
        </div>
        <div className="resetpassword-form-section">
          <div className="resetpassword-header">
            <img src={combinedLogo} alt="combined logo" className="resetpassword-combined-logo" draggable="false" />
            <h1 className="resetpassword-title-text">بوابة الموظف</h1>
            <div className="resetpassword-subtitle-text">تغيير كلمة المرور</div>
          </div>
          <form className="resetpassword-form" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="password"
              className="resetpassword-input"
              placeholder="كلمة المرور الجديدة"
              dir="rtl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="resetpassword-input"
              placeholder="تأكيد كلمة المرور"
              dir="rtl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="resetpassword-btn">تغيير كلمة المرور</button>
            {message && <div className="resetpassword-success">{message}</div>}
            {error && <div className="resetpassword-error">{error}</div>}
          </form>
        </div>
      </div>
      <div className="resetpassword-footer-absolute-container">
        <div className="resetpassword-footer-text-with-logo">
          <img src={eTaxLogo} alt="eTax logo" className="resetpassword-etax-logo" />
          <span className="resetpassword-footer-text">جميع الحقوق محفوظة . مدعوم من</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange; 