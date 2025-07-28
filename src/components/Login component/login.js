import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import leftImage from "../../images/Group 13.png";
import combinedLogo from "../../images/Group 131.png";
import EgyptFlag from "../../images/egypt.svg";
import UKFlag from "../../images/united-kingdom.svg";
import eTaxLogo from "../../images/eTax New logo.svg";
import api from "../../api";
import { validateEmail, validatePassword, validateForm } from "../../utils/validation";

console.log("Login component mounted");

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [language, setLanguage] = useState("ar"); // ar for Arabic, en for English
  const navigate = useNavigate();

  useEffect(() => {
    // Safeguard: If already on /login, prevent any accidental reload/redirect
    if (window.location.pathname === "/login") {
      window.history.replaceState(null, "", "/login");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('');
    }

    // Validate field if it's been touched
    if (touched[name]) {
      const fieldError = name === 'email' ? validateEmail(value) : validatePassword(value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field
    const fieldError = name === 'email' ? validateEmail(value) : validatePassword(value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleClick = (e) => {
    const { name } = e.target;
    
    // If field has been touched, re-validate on click
    if (touched[name]) {
      const value = formData[name];
      const fieldError = name === 'email' ? validateEmail(value) : validatePassword(value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    // Mark all fields as touched and validate
    setTouched({
      email: true,
      password: true
    });

    const validation = validateForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/login", formData);
      
      // Store token and user data
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Show success message, then redirect after 1 second
      setSubmitSuccess(language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
      return;
      
    } catch (error) {
      setLoading(false);
      setSubmitSuccess('');
      // Safeguard: prevent accidental redirect/reload to /login after failed login
      if (window.location.pathname === "/login") {
        window.history.replaceState(null, "", "/login");
      }
      
      if (error.response?.data?.errors) {
        // Backend validation errors
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          backendErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(backendErrors);
      } else if (error.response?.data?.error) {
        // Backend authentication error
        setSubmitError(error.response.data.error);
      } else {
        // Network or other error
        setSubmitError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const getText = (key) => {
    const texts = {
      ar: {
        title: "بوابة الموظف",
        subtitle: "للإستعلام عن تفاصيل الأجور الشهرية",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        forgotPassword: "نسيت كلمة السر ؟",
        resendVerification: "إعادة إرسال بريد التحقق",
        login: "تسجيل الدخول",
        noAccount: "لا تملك حساب !",
        chooseLanguage: "إختر اللغة",
        arabic: "اللغة العربية",
        english: "اللغة الإنجليزية",
        footer: "جميع الحقوق محفوظة . مدعوم من"
      },
      en: {
        title: "Employee Portal",
        subtitle: "For inquiring about monthly salary details",
        email: "Email",
        password: "Password",
        forgotPassword: "Forgot Password?",
        resendVerification: "Resend Verification Email",
        login: "Login",
        noAccount: "Don't have an account!",
        chooseLanguage: "Choose Language",
        arabic: "Arabic",
        english: "English",
        footer: "All rights reserved. Powered by"
      }
    };
    return texts[language][key] || key;
  };

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
            <h1 className="login-title-text">{getText("title")}</h1>
            <div className="login-subtitle-text">{getText("subtitle")}</div>
          </div>
          
          {submitError && (
            <div className="error-message" style={{ 
              color: 'red', 
              textAlign: 'center', 
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#ffe6e6',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}>
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="success-message" style={{
              color: 'green',
              textAlign: 'center',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#e6ffe6',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}>
              {submitSuccess}
            </div>
          )}
          
          <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className={`login-input ${errors.email ? 'error-input' : ''}`}
              placeholder={getText("email")}
              dir={language === "ar" ? "rtl" : "ltr"}
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onClick={handleClick}
            />
            {errors.email && (
              <div className="error-message" style={{ 
                color: 'red', 
                fontSize: '12px', 
                marginTop: '5px',
                textAlign: language === "ar" ? 'right' : 'left',
                fontWeight: 'bold'
              }}>
                {errors.email}
              </div>
            )}
            
            <input
              type="password"
              name="password"
              className={`login-input ${errors.password ? 'error-input' : ''}`}
              placeholder={getText("password")}
              dir={language === "ar" ? "rtl" : "ltr"}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onClick={handleClick}
            />
            {errors.password && (
              <div className="error-message" style={{ 
                color: 'red', 
                fontSize: '12px', 
                marginTop: '5px',
                textAlign: language === "ar" ? 'right' : 'left',
                fontWeight: 'bold'
              }}>
                {errors.password}
              </div>
            )}
            
            <div className="login-links-row">
              <a href="/forgot-password" className="login-link">{getText("forgotPassword")}</a>
              <a href="#" className="login-link">{getText("resendVerification")}</a>
            </div>
            
            <button 
              type="submit" 
              className={`login-btn ${loading ? 'loading-btn' : ''}`}
              disabled={loading}
            >
              {loading ? "جاري التحميل..." : getText("login")}
            </button>
            <button type="button" className="login-register-btn" onClick={() => navigate('/register')}>
              {getText("noAccount")}
            </button>
          </form>
          
          <div className="login-lang-row-custom">
            <span className="choose-lang-text">{getText("chooseLanguage")}</span>
            <div 
              className="lang-option" 
              onClick={() => handleLanguageChange("ar")}
              style={{ cursor: 'pointer' }}
            >
              <span className={`lang-radio ${language === "ar" ? "checked" : ""}`} />
              <img src={EgyptFlag} alt="Egypt flag" className="lang-flag" />
              <span 
                className="lang-label-text" 
                style={{
                  color: language === "ar" ? '#002e6d' : '#828282', 
                  fontWeight: language === "ar" ? 'bold' : 'normal'
                }}
              >
                {getText("arabic")}
              </span>
            </div>
            <div 
              className="lang-option" 
              onClick={() => handleLanguageChange("en")}
              style={{ cursor: 'pointer' }}
            >
              <span className={`lang-radio ${language === "en" ? "checked" : ""}`} />
              <img src={UKFlag} alt="UK flag" className="lang-flag" />
              <span 
                className="lang-label-text" 
                style={{
                  color: language === "en" ? '#002e6d' : '#828282', 
                  fontWeight: language === "en" ? 'bold' : 'normal'
                }}
              >
                {getText("english")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer-absolute-container">
        <div className="login-footer-text-with-logo">
          <img src={eTaxLogo} alt="eTax logo" className="login-etax-logo" />
          <span className="login-footer-text">{getText("footer")}</span>
        </div>
      </div>
    </div>
  );
};

export default Login;