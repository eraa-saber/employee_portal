import React, { useState, useRef } from "react";
import "./forgetPassword.css";
import leftImage from "../../images/Group 13.png";
import combinedLogo from "../../images/Group 131.png";
import eTaxLogo from "../../images/eTax New logo.svg";
import api from "../../api"; // make sure the path matches your project structure
import { useNavigate, useLocation } from 'react-router-dom';

// ForgetPassword component (previously ResetPassword)

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);
  // const navigate = useNavigate();
  // const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/forgot-password", { email });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
      localStorage.setItem('resetEmail', email);
      setCooldown(30);
      if (cooldownRef.current) clearInterval(cooldownRef.current);
      cooldownRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("البريد الإلكتروني غير مسجل.");
      } else {
        setError("حدث خطأ. حاول مرة أخرى.");
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

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
            <div className="resetpassword-subtitle-text">إعادة تعيين كلمة المرور</div>
          </div>
          <form className="resetpassword-form" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="email"
              className="resetpassword-input"
              placeholder="البريد الإلكتروني"
              dir="rtl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={cooldown > 0}
            />
            <button type="submit" className="resetpassword-btn" disabled={cooldown > 0}>
              {cooldown > 0 ? `انتظر ${cooldown} ثانية لإعادة الإرسال` : "إرسال رابط إعادة تعيين كلمة المرور"}
            </button>
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

export default ForgetPassword;
