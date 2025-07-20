import React, { useState } from "react";
import "./resetPassword.css";
import leftImage from "../../images/Group 13.png";
import combinedLogo from "../../images/Group 131.png";
import eTaxLogo from "../../images/eTax New logo.svg";
import api from "../../api"; // make sure the path matches your project structure

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post("/resetpassword", { email });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("البريد الإلكتروني غير مسجل.");
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
            <div className="resetpassword-subtitle-text">للإستعلام عن تفاصيل الأجور الشهرية</div>
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
            />
            <button type="submit" className="resetpassword-btn">
              تعيين كلمة سر جديدة
            </button>
            {message && <div className="resetpassword-success">{message}</div>}
            {error && <div className="resetpassword-error">{error}</div>}
            <div className="resetpassword-links-row">
              <a href="#" className="resetpassword-link">إعادة إرسال بريد التحقق</a>
            </div>
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

export default ResetPassword;
