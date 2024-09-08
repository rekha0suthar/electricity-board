// components/DataTable.js
import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Popup from './Popup';
import Pagination from './Pagination';
import useTable from '../customHooks/useTable'; // Import the custom hook
import '../css/table.css';

const DataTable = () => {
  const { isShow } = useTable();

  return (
    <div>
      <table border="1">
        {/* Use TableHead */}
        <TableHead />
        {/* Use TableBody */}
        <TableBody />
      </table>
      {isShow && <Popup />}
      {/* Pagination Controls */}
      <Pagination />
    </div>
  );
};

export default DataTable;
