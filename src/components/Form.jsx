import React, { useContext } from 'react';
import { TableContext } from '../context/tableContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosSearch } from 'react-icons/io';

const Form = ({ handleDateFilter, handleSearch }) => {
  const { searchQuery, setSearchQuery, startDate } = useContext(TableContext);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100vw',
      }}
    >
      <form onChange={handleSearch}>
        <label>Search by Applicant ID</label>
        <input
          type="text"
          placeholder="Search by Applicant Id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoIosSearch />
      </form>
      {/* Date Picker for filtering by Date of Application */}
      <div className="calendar">
        <label>Search by Date of Application</label>
        <DatePicker
          selected={startDate}
          onChange={handleDateFilter}
          dateFormat="yyyy-MM-dd"
          placeholderText="Filter by Date of Application"
        />
      </div>
    </div>
  );
};

export default Form;
