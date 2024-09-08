import React, { useEffect, useContext } from 'react';
import { MdEdit, MdSave } from 'react-icons/md'; // Add Save icon
import { TableContext } from '../context/tableContext';
import { GrView } from 'react-icons/gr';
import Popup from './Popup';

const DataTable = () => {
  const {
    editRowIndex,
    setEditRowIndex,
    editedRow,
    setEditedRow,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    totalPages,
    setTotalPages,
    csvData,
    setCsvData,
    isShow,
    setIsShow,
    setClickedId,
  } = useContext(TableContext);

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = csvData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (index, row) => {
    setEditRowIndex(index); // Set the index of the row being edited
    setEditedRow({ ...row }); // Store the current row data in state
  };

  // Function to handle editing and saving changes

  const handleSaveClick = () => {
    const id = parseInt(editedRow.ID) - 1;
    // Convert the Load_Applied value to a number
    const loadApplied = parseFloat(editedRow['Load_Applied (in KV)']);

    // Validate the Load_Applied value
    if (isNaN(loadApplied) || loadApplied > 200) {
      alert('Load cannot be more than 200');
    } else {
      const updatedData = [...csvData]; // Make a copy of csvData
      updatedData[id] = editedRow; // Update the specific row
      setCsvData(updatedData); // Update the state with the new data
    }
    setEditRowIndex(null); // Exit edit mode
    alert(`Row ${id + 1} has been updated successfully`);
  };

  const handleChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value }); // Update edited row data
  };

  const handlePopup = (id) => {
    setIsShow(!isShow);
    setClickedId(parseInt(id));
    console.log(id, isShow, csvData);
  };

  // Update total pages
  useEffect(() => {
    setTotalPages(Math.ceil(csvData.length / rowsPerPage));
  }, [csvData, rowsPerPage, setTotalPages]);

  // Pagination range
  const pageRange = 20;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant ID</th>
            <th>Applicant Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>GovtID Type</th>
            <th>ID Number</th>
            <th>Category</th>
            <th>Load Applied (in KV)</th>
            <th>Date of Application</th>
            <th>Status</th>
            <th>Reviewer ID</th>
            <th>Reviewer Name</th>
            <th>Reviewer Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.ID}</td>
              <td>{row.ID_Number}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Applicant_Name}
                    onChange={(e) => handleChange(e, 'Applicant_Name')}
                  />
                ) : (
                  row.Applicant_Name
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Gender}
                    onChange={(e) => handleChange(e, 'Gender')}
                  />
                ) : (
                  row.Gender
                )}
              </td>
              <td className="address">
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={`${editedRow.District} ${editedRow.State}, ${editedRow.Pincode}`}
                    onChange={(e) => handleChange(e, 'District')}
                  />
                ) : (
                  `${row.District} ${row.State}, ${row.Pincode}`
                )}
              </td>

              <td>{row.GovtID_Type}</td>
              <td>{row.ID_Number}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Category}
                    onChange={(e) => handleChange(e, 'Category')}
                  />
                ) : (
                  row.Category
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow['Load_Applied (in KV)']}
                    onChange={(e) => handleChange(e, 'Load_Applied (in KV)')}
                  />
                ) : (
                  row['Load_Applied (in KV)']
                )}
              </td>
              <td>{row.Date_of_Application}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Status}
                    onChange={(e) => handleChange(e, 'Status')}
                  />
                ) : (
                  row.Status
                )}
              </td>
              <td>{row.Reviewer_ID}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Reviewer_Name}
                    onChange={(e) => handleChange(e, 'Reviewer_Name')}
                  />
                ) : (
                  row.Reviewer_Name
                )}
              </td>
              <td className="comments">
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Reviewer_Comments}
                    onChange={(e) => handleChange(e, 'Reviewer_Comments')}
                  />
                ) : (
                  row.Reviewer_Comments
                )}
              </td>
              <td className="actions">
                {editRowIndex === index ? (
                  <span onClick={handleSaveClick}>
                    <MdSave />
                  </span>
                ) : (
                  <>
                    <span onClick={() => handleEditClick(index, row)}>
                      <MdEdit />
                    </span>
                    <span onClick={() => handlePopup(index)}>
                      <GrView />
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShow && <Popup />}
      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<< '}Previous
        </button>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next {' >> '}
        </button>
      </div>
    </div>
  );
};

export default DataTable;
