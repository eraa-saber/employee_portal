import React, { useState } from 'react';

const statusColor = (status) => {
  if (status === 'جاري التنفيذ') return { color: 'orange', fontWeight: 'bold' };
  if (status === 'تم الارسال') return { color: 'green', fontWeight: 'bold' };
  return {};
};

export default function RequestsList({ requests }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pageCount = Math.ceil(requests.length / rowsPerPage);

  const paginated = requests.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="table-container-wrapper">
      <table className="requests-table">
        <thead>
          <tr>
            <th>تاريخ الطلب</th>
            <th>شهر الراتب</th>
            <th>سنة الراتب</th>
            <th>حالة الطلب</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((row, index) => (
            <tr key={row.id} className={index % 2 === 1 ? 'alt-row' : ''}>
              <td>{row.date}</td>
              <td>{row.month}</td>
              <td>{row.year}</td>
              <td style={statusColor(row.status)}>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))}>&lt;</button>
          {[...Array(pageCount)].map((_, idx) => (
            <button
              key={idx}
              className={page === idx + 1 ? 'active' : ''}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          )).reverse()}
          <button onClick={() => setPage(p => Math.min(pageCount, p + 1))}>&gt;</button>
        </div>
      </div>
    </div>
  );
} 