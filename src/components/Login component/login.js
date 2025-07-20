import React from "react";
import "./login.css";
import leftImage from "../../images/Group 13.png";
import combinedLogo from "../../images/Group 131.png";
import EgyptFlag from "../../images/egypt.svg";
import UKFlag from "../../images/united-kingdom.svg";
import eTaxLogo from "../../images/eTax New logo.svg";

const Login = () => {
  return (
    <div className="login-root">
      <div className="login-container ">
        <div className="login-image-section no-clip">
          <img
            src={leftImage}
            alt="login visual"
            className="login-image-full no-mirror"
            draggable="false"
          />
        </div>
        <div className="login-form-section">
          <div className="login-header">
            <img src={combinedLogo} alt="combined logo" className="login-combined-logo" draggable="false" />
            <h1 className="login-title-text">بوابة الموظف</h1>
            <div className="login-subtitle-text">للإستعلام عن تفاصيل الأجور الشهرية</div>
          </div>
          <form className="login-form" autoComplete="off">
            <input
              type="email"
              className="login-input"
              placeholder="البريد الإلكتروني"
              dir="rtl"
            />
            <input
              type="password"
              className="login-input"
              placeholder="كلمة المرور"
              dir="rtl"
            />
            <div className="login-links-row">
              <a href="/resetpassword" className="login-link">نسيت كلمة السر ؟</a>
              <a href="#" className="login-link">إعادة إرسال بريد التحقق</a>
            </div>
            <button type="submit" className="login-btn">تسجيل الدخول</button>
            <button type="button" className="login-register-btn">لا تملك حساب !</button>
          </form>
          <div className="login-lang-row-custom">
            <span className="choose-lang-text">إختر اللغة</span>
            <div className="lang-option">
              <span className="lang-radio checked" />
              <img src={EgyptFlag} alt="Egypt flag" className="lang-flag" />
              <span className="lang-label-text" style={{color: '#002e6d', fontWeight: 'bold'}}>اللغة العربية</span>
            </div>
            <div className="lang-option">
              <span className="lang-radio" />
              <img src={UKFlag} alt="UK flag" className="lang-flag" />
              <span className="lang-label-text" style={{color: '#828282', fontWeight: 'bold'}}>اللغة الإنجليزية</span>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer-absolute-container">
        <div className="login-footer-text-with-logo">
          <img src={eTaxLogo} alt="eTax logo" className="login-etax-logo" />
          <span className="login-footer-text">جميع الحقوق محفوظة . مدعوم من</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
