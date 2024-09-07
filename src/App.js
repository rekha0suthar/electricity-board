import { useContext, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import csvFile from './electricity_board.csv';
import DataTable from './components/Datatable';

import { TableContext } from './context/tableContext';
import Form from './components/Form';

function App() {
  const {
    csvData,
    setCsvData,
    originalData,
    setOriginalData,
    searchQuery,

    setStartDate,
  } = useContext(TableContext);

  useEffect(() => {
    // Fetch the CSV file
    fetch(csvFile)
      .then((response) => response.text())
      .then((data) => {
        // Parse CSV data using PapaParse
        Papa.parse(data, {
          header: true, // Set to true to treat the first row as headers
          complete: (result) => {
            setCsvData(result.data);
            setOriginalData(result.data); // Store original data in a separate state
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching the CSV file:', error);
      });
  }, [setCsvData, setOriginalData]);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission refresh

    let filteredData = originalData;

    // Filter by search query (Applicant ID Number)
    if (searchQuery.trim() !== '') {
      filteredData = filteredData.filter((item) =>
        String(item.ID_Number).includes(searchQuery)
      );
    }

    setCsvData(filteredData); // Update the filtered data
  };

  const handleDateFilter = (date) => {
    setStartDate(date);
    if (date) {
      const selectedDate = new Date(date).toLocaleDateString('en-CA'); // Convert date to yyyy-mm-dd
      const filteredDateData = originalData.filter((item) => {
        const applicationDate = new Date(
          item.Date_of_Application
        ).toLocaleDateString('en-CA');
        return applicationDate === selectedDate;
      });
      setCsvData(filteredDateData);
    } else {
      setCsvData(originalData); // Reset to original data if no date is selected
    }
  };

  // Function to handle editing and saving changes
  const handleSave = (index, updatedRow) => {
    // Convert the Load_Applied value to a number
    const loadApplied = parseFloat(updatedRow['Load_Applied (in KV)']);

    // Validate the Load_Applied value
    if (isNaN(loadApplied) || loadApplied > 200) {
      alert('Load cannot be more than 200');
    } else {
      const updatedData = [...csvData]; // Make a copy of csvData
      updatedData[index] = updatedRow; // Update the specific row
      setCsvData(updatedData); // Update the state with the new data
    }
  };

  return (
    <div className="App">
      <h2>Electricity Board</h2>

      {/* Search form */}
      <Form handleDateFilter={handleDateFilter} handleSearch={handleSearch} />

      {/* Table to display the filtered CSV data */}
      <DataTable onSave={handleSave} />
    </div>
  );
}

export default App;
