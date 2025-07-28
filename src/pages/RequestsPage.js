import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RequestsSearch from '../components/requests/RequestsSearch';
import RequestsList from '../components/requests/RequestsList';
import './RequestsPage.css';
import eTaxLogo from '../images/eTax New logo.svg';
import api from '../api'; // Import your API utility
 
const arabicMonths = [
  '',
  'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];
 
function getMonthIndex(monthName) {
  return arabicMonths.indexOf(monthName);
}
 
function compareYearMonth(aYear, aMonth, bYear, bMonth) {
  // Returns -1 if a < b, 0 if equal, 1 if a > b
  if (aYear < bYear) return -1;
  if (aYear > bYear) return 1;
  // Years are equal, compare months
  if (aMonth < bMonth) return -1;
  if (aMonth > bMonth) return 1;
  return 0;
}
 
export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/requests');
        // Reformat data to match the component's expected structure
        const formattedData = response.data.map(req => ({
          id: req.id,
          date: new Date(req.request_date).toLocaleDateString('en-GB'),
          month: req.salary_month,
          year: req.salary_year,
          status: req.status,
          voucher_no: req.voucher_no,
        }));
        setRequests(formattedData);
        setFiltered(formattedData);
      } catch (err) {
        setError('Failed to fetch requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
 
    fetchRequests();
  }, []);
 
  const handleSearch = (filters) => {
    let result = requests;
    // Convert input to numbers
    const fromYear = Number(filters.fromYear);
    const toYear = Number(filters.toYear);
    const fromMonth = Number(filters.fromMonth);
    const toMonth = Number(filters.toMonth);
    // Only filter if both from and to are provided
    if (fromYear && fromMonth && toYear && toMonth) {
      result = result.filter(r => {
        const rYear = Number(r.year);
        const rMonth = getMonthIndex(r.month);
        // Compare (fromYear, fromMonth) <= (rYear, rMonth) <= (toYear, toMonth)
        return (
          compareYearMonth(fromYear, fromMonth, rYear, rMonth) <= 0 &&
          compareYearMonth(rYear, rMonth, toYear, toMonth) <= 0
        );
      });
    } else {
      // Improved logic: only compare months if years are equal
      if (filters.fromYear && filters.fromMonth) {
        result = result.filter(r => {
          const rYear = Number(r.year);
          const rMonth = getMonthIndex(r.month);
          return (
            rYear > fromYear ||
            (rYear === fromYear && rMonth >= fromMonth)
          );
        });
      } else if (filters.fromYear) {
        result = result.filter(r => Number(r.year) >= fromYear);
      } else if (filters.fromMonth) {
        result = result.filter(r => getMonthIndex(r.month) >= fromMonth);
      }
      if (filters.toYear && filters.toMonth) {
        result = result.filter(r => {
          const rYear = Number(r.year);
          const rMonth = getMonthIndex(r.month);
          return (
            rYear < toYear ||
            (rYear === toYear && rMonth <= toMonth)
          );
        });
      } else if (filters.toYear) {
        result = result.filter(r => Number(r.year) <= toYear);
      } else if (filters.toMonth) {
        result = result.filter(r => getMonthIndex(r.month) <= toMonth);
      }
    }
    setFiltered(result);
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>{error}</div>;
  }
 
  return (
    <>
      <Navbar />
      <div className="page-container" dir="rtl">
        <header className="page-header">
          <h1 className="page-title">طلباتي</h1>
        </header>
        <div className="content-card">
          <RequestsSearch onSearch={handleSearch} />
          <RequestsList requests={filtered} />
        </div>
        <footer className="page-footer">
          <span>جميع الحقوق محفوظة . مدعوم من</span>
          <img src={eTaxLogo} alt="eTax logo" />
        </footer>
      </div>
    </>
  );
}
 