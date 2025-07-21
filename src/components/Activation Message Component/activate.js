import React from "react";
import "./ActivationMessage.css";
import combinedLogo from "../../images/Group 131.png";
import eTaxLogo from "../../images/eTax New logo.svg";
import eTaxPhoto from "../../images/Group 18.png";
import { useNavigate } from "react-router-dom";

export default function Activate() {
  const navigate = useNavigate();

  return (
    <div className="activation-container">
      {/* Left Content */}
      <div className="activation-left">
        <div className="activation-content">
          <img src={combinedLogo} alt="combined logo" className="activation-logo" draggable="false" />
          <h2 className="activation-title">بوابة الموظف</h2>
          <p className="activation-subtitle">للاستعلام عن تفاصيل الأجور الشهرية</p>
          <h3 className="activation-welcome">
            أهلاً بك في <span className="activation-highlight">بوابة الموظف</span>
          </h3>
          <p className="activation-msg">
            تم إنشاء حساب بنجاح ، يمكنك الآن تسجيل الدخول للاستعلام عن راتبك الوظيفى
          </p>
          <button className="activation-button" onClick={() => navigate("/login")}>
            تسجيل الدخول
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="activation-right">
        <img src={eTaxPhoto} alt="activation visual" className="activation-image" draggable="false" />
      </div>

      {/* Footer */}
      <div className="activation-footer">
        <img src={eTaxLogo} alt="eTax logo" className="activation-etax-logo" draggable="false" />
        <span className="activation-footer-text">جميع الحقوق محفوظة . مدعوم من</span>
      </div>
    </div>
  );
}
