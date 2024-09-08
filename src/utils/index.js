// import React, { useContext } from 'react';
// import { TableContext } from '../context/tableContext';

// // Function to handle editing and saving changes
// const handleSaveClick = ({ editedRow }) => {
//   const { setCsvData } = useContext(TableContext);

//   const id = parseInt(editedRow.ID) - 1;
//   // Convert the Load_Applied value to a number
//   const loadApplied = parseFloat(editedRow['Load_Applied (in KV)']);

//   // Validate the Load_Applied value
//   if (isNaN(loadApplied) || loadApplied > 200) {
//     alert('Load cannot be more than 200');
//   } else {
//     const updatedData = [...csvData]; // Make a copy of csvData
//     updatedData[id] = editedRow; // Update the specific row
//     setCsvData(updatedData); // Update the state with the new data
//   }
//   setEditRowIndex(null); // Exit edit mode
//   alert(`Row ${id + 1} has been updated successfully`);
// };
