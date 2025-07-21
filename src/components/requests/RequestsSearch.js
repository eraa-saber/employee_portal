import React, { useState } from 'react';
import calendarIcon from '../../images/Icon feather-calendar.svg';

export default function RequestsSearch({ onSearch }) {
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ fromYear, toYear, fromMonth, toMonth });
  };

  return (
    <form className="requests-search" onSubmit={handleSubmit} dir="rtl">
      <button type="submit" className="search-btn">بحث</button>
      <div className="search-inputs">
        <div className="date-input-wrapper">
          <input type="number" placeholder="من شهر" value={fromMonth} onChange={e => setFromMonth(e.target.value.replace(/[^0-9]/g, ''))} min="1" max="12" />
          <img src={calendarIcon} alt="calendar" />
        </div>
        <div className="date-input-wrapper">
          <input type="number" placeholder="من سنة" value={fromYear} onChange={e => setFromYear(e.target.value.replace(/[^0-9]/g, ''))} />
          <img src={calendarIcon} alt="calendar" />
        </div>
        <div className="date-input-wrapper">
          <input type="number" placeholder="الى شهر" value={toMonth} onChange={e => setToMonth(e.target.value.replace(/[^0-9]/g, ''))} min="1" max="12" />
          <img src={calendarIcon} alt="calendar" />
        </div>
        <div className="date-input-wrapper">
          <input type="number" placeholder="الى سنة" value={toYear} onChange={e => setToYear(e.target.value.replace(/[^0-9]/g, ''))} />
          <img src={calendarIcon} alt="calendar" />
        </div>
      </div>
    </form>
  );
} 