import React from 'react';
import useTable from '../customHooks/useTable';
import { MdEdit, MdSave } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

const TableBody = () => {
  const {
    currentRows,
    editRowIndex,
    editedRow,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePopup,
  } = useTable();
  return (
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
  );
};

export default TableBody;
