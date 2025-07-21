import React from "react";
import "./error.css";
import eTaxLogo from "../../images/eTax New logo.svg";
import errorImage from "../../images/OBJECTS.svg";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar"; // ✅ Import Navbar component

export default function Error() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar /> {/* ✅ Add the Navbar at the top */}
      <div className="error-page-container">
        <div className="error-image-container">
          <img
            src={errorImage}
            alt="404 illustration"
            className="error-image"
            draggable="false"
          />
        </div>

        <h2 className="error-text">هذه الصفحة غير موجودة</h2>

        <button className="error-button" onClick={() => navigate("/home")}>
          الصفحة الرئيسية
        </button>

        <div className="error-footer">
          <img
            src={eTaxLogo}
            alt="eTax logo"
            className="error-etax-logo"
            draggable="false"
          />
          <span className="error-footer-text">
            جميع الحقوق محفوظة . مدعوم من
          </span>
        </div>
      </div>
    </>
  );
}
