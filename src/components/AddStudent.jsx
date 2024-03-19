import { forwardRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddStudent = ({ openAdd, setOpenAdd, addStudent, fetchStudents }) => {
  const [student, setStudent] = useState({
    name: "",
    description: "",
    sale: "",
  });
  const [avatar, setAvatar] = useState();

  const handleClose = () => {
    setOpenAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({ ...student, avatar });
    setStudent({
      name: "",
      description: "",
      sale: "",
    });
    setOpenAdd(false);
    fetchStudents();
  };

  return (
    <Dialog
      open={openAdd}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add student</DialogTitle>
      <DialogContent>
        <form style={{ width: "400px" }}>
          <Stack sx={{ paddingBottom: "24px" }}>
            <TextField
              label="Name"
              variant="standard"
              id="name"
              name="name"
              value={student.name}
              onChange={(e) =>
                setStudent({
                  ...student,
                  name: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <TextField
              label="Description"
              variant="standard"
              id="description"
              name="description"
              value={student.description}
              onChange={(e) =>
                setStudent({
                  ...student,
                  description: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <TextField
              label="Sale"
              variant="standard"
              type="number"
              id="sale"
              name="sale"
              value={student.sale}
              onChange={(e) =>
                setStudent({
                  ...student,
                  sale: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                id="avatar"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files && e.target.files[0])}
              />
            </Button>
            <div>{avatar && avatar.name}</div>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudent;
