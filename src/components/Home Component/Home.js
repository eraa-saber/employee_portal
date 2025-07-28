import React, { useState } from 'react';
import Navbar from '../Navbar';
import './Home.css';
import api from '../../api';
import footerSvg from '../../images/images for home page/جميع الحقوق محفوظة . مدعوم من.svg';
import titleSubtitleSvg from '../../images/images for home page/home (1).svg';
import buttonSvg from '../../images/images for home page/إستعلام عن الراتب.svg';
import calendarIcon from '../../images/images for home page/Icon feather-calendar.svg';
import lockIcon from '../../images/images for home page/Icon feather-lock.svg';
import group8 from '../../images/images for home page/Group 8.svg';
import etaxLogo from '../../images/images for home page/eTax New logo.svg';
import boxSvg from '../../images/images for home page/Rectangle 1631.svg';

export default function Home() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const months = [
    'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const validate = () => {
    const newErrors = {};
    if (!month) newErrors.month = 'تحديد الشهر المطلوب';
    if (!year) newErrors.year = 'تحديد السنة المطلوبة';
    if (!password) newErrors.password = 'كلمة سر القسيمة';
    return newErrors;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
          // Send month as Arabic string as requested
          const response = await api.post('/home', {
            month: month,
            year,
            password
          });
          if (response.data.errors) {
            setErrors(response.data.errors);
            return;
          }
          // handle response here
          window.location.href = '/requests';
        } catch (error) {
          // handle error here
          setErrors({ api: 'حدث خطأ أثناء إرسال الطلب' });
        }
      };

  return (
    <div className="home-root">
      <Navbar />
      <div className="home-container">
        {/* Right Side Only */}
        <div className="home-form-section">
          {/* Decorative Group 8.svg */}
          <div className="home-group8-wrapper">
            <img src={group8} alt="decorative lines" className="home-group8-svg" />
          </div>
          {/* Title and subtitle SVG */}
          <div className="home-header">
            <img src={titleSubtitleSvg} alt="بوابة الموظف - الإستعلام عن تفاصيل راتبك الشهرى" className="home-title-subtitle-svg" />
          </div>
          {/* Form */}
          <form className="home-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className="home-form-row">
              <select
                className="home-input home-box-size"
                value={month}
                onChange={e => setMonth(e.target.value)}
              >
                <option value="" disabled>تحديد الشهر المطلوب</option>
                {months.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
              <img src={calendarIcon} alt="calendar" className="home-icon-svg" />
            </div>
            {errors.month && <div className="home-error-message">{errors.month}</div>}
            <div className="home-form-row">
              <select
                className="home-input home-box-size"
                value={year}
                onChange={e => setYear(e.target.value)}
              >
                <option value="" disabled>تحديد السنة المطلوبة </option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <img src={calendarIcon} alt="calendar" className="home-icon-svg" />
            </div>
            {errors.year && <div className="home-error-message">{errors.year}</div>}
            <div className="home-form-row">
              <input
                type="password"
                className="home-input home-box-size"
                placeholder="كلمة سر القسيمة "
                value={password}
                onChange={e => setPassword(e.target.value)}
                dir="rtl"
              />
              <img src={lockIcon} alt="lock" className="home-icon-svg" />
            </div>
            {errors.password && <div className="home-error-message">{errors.password}</div>}
            <button type="submit" className="home-btn-svg home-box-size">
              <img src={boxSvg} alt="button background" className="home-btn-box-bg" />
              <img src={buttonSvg} alt="استعلام عن الراتب" className="home-button-svg-on-box" />
            </button>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="home-footer-absolute-container">
        <img src={etaxLogo} alt="eTax logo" className="home-etax-logo" />
        <img src={footerSvg} alt="footer text" className="home-footer-svg" />
      </div>
    </div>
  );
}
