// src/hooks/useCsvData.js
import { useEffect, useContext } from 'react';
import Papa from 'papaparse';
import { TableContext } from '../context/tableContext';
import csvFile from '../electricity_board.csv';

// Custom hook to manage CSV data
export const useCsvData = () => {
  const {
    setCsvData,
    originalData,
    setOriginalData,
    searchQuery,
    setStartDate,
  } = useContext(TableContext);

  useEffect(() => {
    // Fetch and parse CSV data
    fetch(csvFile)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (result) => {
            setCsvData(result.data);
            setOriginalData(result.data);
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching the CSV file:', error);
      });
  }, [setCsvData, setOriginalData]);

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredData = originalData;

    if (searchQuery.trim() !== '') {
      filteredData = filteredData.filter((item) =>
        String(item.ID_Number).includes(searchQuery)
      );
    }

    setCsvData(filteredData);
  };

  const handleDateFilter = (date) => {
    setStartDate(date);
    if (date) {
      const selectedDate = new Date(date).toLocaleDateString('en-CA');
      const filteredDateData = originalData.filter((item) => {
        const applicationDate = new Date(
          item.Date_of_Application
        ).toLocaleDateString('en-CA');
        return applicationDate === selectedDate;
      });
      setCsvData(filteredDateData);
    } else {
      setCsvData(originalData);
    }
  };

  return { handleSearch, handleDateFilter };
};
