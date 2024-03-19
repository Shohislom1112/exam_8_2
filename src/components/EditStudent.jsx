import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditStudent = ({
  openEdit,
  setOpenEdit,
  selectedStudent,
  fetchStudents,
}) => {
  const [editedStudent, setEditedStudent] = useState({
    name: selectedStudent.name,
    description: selectedStudent.description,
    sale: selectedStudent.sale,
  });

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://65bb755f52189914b5bc33c8.mockapi.io/Images/${selectedStudent.id}`,
        editedStudent
      );
      fetchStudents();
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Dialog open={openEdit} onClose={handleClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          name="name"
          value={editedStudent.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          name="description"
          value={editedStudent.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Age"
          type="number"
          fullWidth
          name="sale"
          value={editedStudent.sale}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;
