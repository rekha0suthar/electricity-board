import React from 'react';
import { MdEdit, MdSave } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import Popup from './Popup';
import useTable from '../customHooks/useTable'; // Import the custom hook

const DataTable = () => {
  const {
    currentRows,
    totalPages,
    currentPage,
    handlePageChange,
    editRowIndex,
    editedRow,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePopup,
    isShow,
  } = useTable();

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
              <td className={editRowIndex === index ? 'edit' : 'address'}>
                {editRowIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedRow.District}
                      onChange={(e) => handleChange(e, 'District')}
                      placeholder="District"
                    />
                    <input
                      type="text"
                      value={editedRow.State}
                      onChange={(e) => handleChange(e, 'State')}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={editedRow.Pincode}
                      onChange={(e) => handleChange(e, 'Pincode')}
                      placeholder="Pincode"
                    />
                  </>
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
