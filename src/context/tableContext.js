import { createContext, useState } from 'react';

const TableContext = createContext({
  csvData: [],
  setCsvData: () => {},
  originalData: [],
  setOriginalData: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  startDate: null,
  setStartDate: () => {},
  editRowIndex: null,
  setEditRowIndex: () => {},
  editedRow: {},
  setEditedRow: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  rowsPerPage: 20,
  totalPages: 1,
  setTotalPages: () => {},
});

const TableProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // To store the original data
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null); // For filtering based on Date of Application

  const [editRowIndex, setEditRowIndex] = useState(null); // Track which row is being edited
  const [editedRow, setEditedRow] = useState({}); // Track edits for the current row
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [rowsPerPage] = useState(20); // Number of rows per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  return (
    <TableContext.Provider
      value={{
        csvData,
        setCsvData,
        originalData,
        setOriginalData,
        searchQuery,
        setSearchQuery,
        startDate,
        setStartDate,
        editRowIndex,
        setEditRowIndex,
        editedRow,
        setEditedRow,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
