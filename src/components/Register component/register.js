import React, { useState } from "react";
import "./register.css";
import combinedLogo from "../../images/Group 131.png";
import EgyptFlag from "../../images/egypt.svg";
import UKFlag from "../../images/united-kingdom.svg";
import eTaxLogo from "../../images/eTax New logo.svg";
import eTaxPhoto from "../../images/Group 5.png";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    insuranceNumber: "",
    nationalId: "",
    nationalIdImage: null,
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim())
      newErrors.username = "اسم المستخدم مطلوب";

    if (!formData.email.trim())
      newErrors.email = "البريد الإلكتروني مطلوب";

    if (!formData.password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صالح. يجب أن يبدأ بـ 01 ويحتوي على 11 رقمًا";
    }

    if (!formData.insuranceNumber.trim()) {
      newErrors.insuranceNumber = "الرقم التأميني مطلوب";
    } else if (!/^\d+$/.test(formData.insuranceNumber)) {
      newErrors.insuranceNumber = "الرقم التأميني يجب أن يحتوي على أرقام فقط";
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = "الرقم القومي مطلوب";
    } else if (!/^\d+$/.test(formData.nationalId)) {
      newErrors.nationalId = "الرقم القومي يجب أن يحتوي على أرقام فقط";
    }

        if (!formData.nationalIdImage) {
      newErrors.nationalIdImage = "يرجى إرفاق صورة الرقم القومي";
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const form = new FormData();
    form.append("FullName", formData.username);
    form.append("Email", formData.email);
    form.append("password", formData.password);
    form.append("password_confirmation", formData.confirmPassword);
    form.append("Phone", formData.phone);
    form.append("insurranceNo", formData.insuranceNumber);
    form.append("NationalID", formData.nationalId);
    form.append("TermsAndConditions", true);

    if (formData.nationalIdImage instanceof File) {
      form.append("DocURL", formData.nationalIdImage);
    } else {
      alert("Please upload a valid image.");
      return;
    }

    const response = await axios.post("/register", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setLoginSuccess(true);
    setTimeout(() => {
      navigate("/activate");
    }, 2000);



  } catch (error) {
    console.error("Registration failed:", error);
    if (error.response && error.response.data) {
      alert("فشل التسجيل: " + JSON.stringify(error.response.data.errors || error.response.data));
    } else {
      alert("حدث خطأ أثناء الاتصال بالخادم");
    }
  }
};



  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-image-section2 no-clip">
          <img src={eTaxPhoto} alt="login visual" className="login-image-full no-mirror" draggable="false" />
        </div>

        <div className="login-form-section">
          <div className="login-header">
            <img src={combinedLogo} alt="combined logo" className="login-combined-logo" draggable="false" />
            <h1 className="login-title-text">بوابة الموظف</h1>
            <div className="login-subtitle-text">للإستعلام عن تفاصيل الأجور الشهرية</div>
          </div>

          {loginSuccess && (
            <div className="success-message">
              ✅ تم التسجيل بنجاح! سيتم تحويلك الآن إلى صفحة تسجيل الدخول...
            </div>
          )}
          <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="input-row">
              <div className="input-with-error">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="اسم المستخدم"
                  dir="rtl"
                />
                {errors.username && <span className="error-msg">{errors.username}</span>}
              </div>
              <div className="input-with-error">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="البريد الإلكتروني"
                  dir="rtl"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="input-row">
              <div className="input-with-error">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="كلمة المرور"
                  dir="rtl"
                />
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>
              <div className="input-with-error">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="تأكيد كلمة المرور"
                  dir="rtl"
                />
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Row 3 */}
            <div className="input-row">
              <div className="input-with-error">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="رقم الهاتف"
                  dir="rtl"
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div className="input-with-error">
                <input
                  type="text"
                  name="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="الرقم التأميني"
                  dir="rtl"
                />
                {errors.insuranceNumber && <span className="error-msg">{errors.insuranceNumber}</span>}
              </div>
            </div>

            {/* Row 4 */}
            <div className="input-row">
              <div className="input-with-error">
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="الرقم القومي"
                  dir="rtl"
                />
                {errors.nationalId && <span className="error-msg">{errors.nationalId}</span>}
              </div>
              <div className="input-with-error">
                <input
                  type="text"
                  className="login-input"
                  placeholder="إرفاق صورة الرقم القومي"
                  value={formData.nationalIdImage ? formData.nationalIdImage.name : ""}
                  readOnly
                  dir="rtl"
                  onClick={() => document.getElementById('fileUpload').click()}
                  style={{ cursor: 'pointer' }}
                />
                <input
                  type="file"
                  id="fileUpload"
                  accept=".png,.jpg,.jpeg,.pdf"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nationalIdImage: e.target.files[0],
                    })
                  }
                />
                {errors.nationalIdImage && <span className="error-msg">{errors.nationalIdImage}</span>}
              </div>
            </div>

            {/* Checkbox */}
            <div className="checkbox-row">
              <label><input type="checkbox" /> استخدام نفس البريد الإلكتروني السابق للمراسلات</label>
              <label><input type="checkbox" /> أوافق على الشروط و الاحكام</label>
            </div>

            {/* Buttons */}
            <div className="login-buttons">
              <button type="submit" className="login-btn">إنشاء حساب جديد</button>
              <button type="button" className="login-register-btn">لدي حساب بالفعل</button>
            </div>
          </form>

          <div className="login-lang-row-custom">
            <span className="choose-lang-text">إختر اللغة</span>
            <div className="lang-option">
              <span className="lang-radio checked" />
              <img src={EgyptFlag} alt="Egypt flag" className="lang-flag" />
              <span className="lang-label-text" style={{ color: '#002e6d', fontWeight: 'bold' }}>اللغة العربية</span>
            </div>
            <div className="lang-option">
              <span className="lang-radio" />
              <img src={UKFlag} alt="UK flag" className="lang-flag" />
              <span className="lang-label-text" style={{ color: '#828282', fontWeight: 'bold' }}>اللغة الإنجليزية</span>
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

export default Register;