// src/App.js
import React from 'react';
import './App.css';
import DataTable from './components/Datatable';
import Form from './components/Form';
import { useCsvData } from './customHooks/useCsvData';

function App() {
  const { handleSearch, handleDateFilter } = useCsvData();

  return (
    <div className="App">
      <h2>Electricity Board</h2>
      {/* Search form */}
      <Form handleDateFilter={handleDateFilter} handleSearch={handleSearch} />
      {/* Table to display the filtered CSV data */}
      <DataTable />
    </div>
  );
}

export default App;
